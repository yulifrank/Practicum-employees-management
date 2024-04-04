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
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository= positionRepository;    
        }
        public async Task<IEnumerable<Position>> GetPositions()
        {
            return await _positionRepository.GetPositions();
        }
        public async Task<Position> AddPositionAsync(Position employee)
        {
            return await _positionRepository.AddPositionAsync(employee);
        }
        public async Task<bool> DeletePositionAsync(int id)
        {
            return await _positionRepository.DeletePositionAsync(id);
        }



   
    }
}
