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
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;
        public PositionRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Position> AddPositionAsync(Position position)
        {
            var existingPosition = await _context.Positions.FirstOrDefaultAsync(p => p.PositionName == position.PositionName);
            if (existingPosition != null)
            {
                return null;
            }
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task<IEnumerable<Position>> GetPositions()
        {
            return await _context.Positions.ToListAsync();
        }

       public async Task<bool> DeletePositionAsync(int id)
        {
            var position = await _context.Positions.FirstOrDefaultAsync(e => e.PositionId==id);

            if (position != null)
            {
                _context.Positions.Remove(position);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

    }
}
