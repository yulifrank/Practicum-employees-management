using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Repositories
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> GetPositions();
        Task<Position> AddPositionAsync(Position position);

        Task<bool> DeletePositionAsync(int id);
    }
}
