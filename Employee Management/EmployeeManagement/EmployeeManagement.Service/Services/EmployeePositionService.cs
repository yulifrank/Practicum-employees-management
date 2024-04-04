using EmployeeManagement.Core.Models;
using EmployeeManagement.Core.Repositories;
using EmployeeManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Service.Services
{
    public class EmployeePositionService : IEmployeePositionService
    {
        private readonly IEmployeePositionRepository _employeePositionRepository;
        public EmployeePositionService(IEmployeePositionRepository employeePositionRepository )
        {
            _employeePositionRepository = employeePositionRepository;
        }

        public async Task<EmployeePosition> AddPositionToEmployeeAsync(int code, EmployeePosition employeePosition)
        {
            employeePosition.EmployeeId= code;
            return await _employeePositionRepository.AddPositionToEmployeeAsync(employeePosition);
        }
        public async Task <EmployeePosition> GetEmployeePositionsByIdAsync(int employeeId, int positionId)
        {
            return await _employeePositionRepository.GetEmployeePositionsByIdAsync(employeeId, positionId);
        }
        public async Task<bool> DeletePositionFromEmployeeAsync(int employeeId, int positionId)
        {
            return await _employeePositionRepository.DeletePositionFromEmployeeAsync(employeeId, positionId);
        }

        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
               return await   _employeePositionRepository.GetEmployeePositionsAsync(employeeId);
        }

        public async  Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId, int positionId, EmployeePosition employeePosition)
        {
            return await _employeePositionRepository.UpdatePositionToEmployeeAsync(employeeId, positionId, employeePosition);
        }
    }
}
