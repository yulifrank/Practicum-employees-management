using EmployeeManagement.Core.Models;
using EmployeeManagement.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Data.Repositories
{
    public class EmployeePositionRepository: IEmployeePositionRepository
    {
        private readonly DataContext _context;
        public EmployeePositionRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
            var positions = await _context.EmployeePositions
                .Where(e => e.EmployeeId == employeeId && e.IsActive)
                .Include(p => p.Position)
                .Include(p2 => p2.Employee)
                .ToListAsync();

            return positions.Any() ? positions : null;
        }

        public async Task<EmployeePosition> GetEmployeePositionsByIdAsync(int employeeId, int positionId)
        {
            return await _context.EmployeePositions.FirstOrDefaultAsync(emp => emp.EmployeeId == employeeId && emp.PositionId == positionId);

        }
        public async Task<EmployeePosition> AddPositionToEmployeeAsync(EmployeePosition employeePosition)
        {
            // בדיקה האם התפקיד כבר קיים בטבלה והשדה IsActive הוא false
            var existingPosition = await _context.EmployeePositions
                .FirstOrDefaultAsync(ep => ep.EmployeeId == employeePosition.EmployeeId
                                          && ep.PositionId == employeePosition.PositionId
                                          && ep.IsActive == false);

            if (existingPosition != null)   
                return await UpdatePositionToEmployeeAsync(employeePosition.EmployeeId, employeePosition.PositionId, employeePosition);
            

            // אם התפקיד אינו קיים בטבלה או שהוא כבר פעיל, נוסיף אותו בצורה רגילה
            await _context.EmployeePositions.AddAsync(employeePosition);
            await _context.SaveChangesAsync();
            return employeePosition;
        }

        public async Task<bool> DeletePositionFromEmployeeAsync(int employeeId, int positionId)
        {
           var deletedPosition=await _context.EmployeePositions.FirstOrDefaultAsync(e=>e.EmployeeId== employeeId&&e.PositionId==positionId);
            if (deletedPosition != null)
            {
                deletedPosition.IsActive = false;
                await _context.SaveChangesAsync();
                return true;
            }
            return false; 
        }

       public async Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId,int positionId ,EmployeePosition employeePosition)
        {

            var updatePosition = await _context.EmployeePositions.FirstOrDefaultAsync(e => e.EmployeeId == employeeId&&e.PositionId==positionId);

            if (updatePosition == null)
            {
                return null;
            }
            updatePosition.IsActive = true;
            updatePosition.EntryDate = employeePosition.EntryDate;
            updatePosition.IsManagement = employeePosition.IsManagement;
            await _context.SaveChangesAsync();

            return updatePosition;
        }
    }
}
