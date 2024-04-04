using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Services
{
    public interface IPositionService
    {
         Task <IEnumerable<Position>> GetPositions();
        Task<Position> AddPositionAsync(Position employee);
        //Task<Position> UpdatePositionAsync(int id, Position employee);
        Task<bool> DeletePositionAsync(int id);
    }
}
