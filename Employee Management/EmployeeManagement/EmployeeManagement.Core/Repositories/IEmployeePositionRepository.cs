using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Repositories
{
    public interface IEmployeePositionRepository
    {
        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId); // לקבל את רשי;ת התפקידים של עובד מסוים
        Task<EmployeePosition> AddPositionToEmployeeAsync(EmployeePosition employeePosition); // להוסיף תפקיד לעובד
        Task<EmployeePosition> GetEmployeePositionsByIdAsync(int employeeId, int positionId);
        Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId, int positionId, EmployeePosition employeePosition);
        Task<bool> DeletePositionFromEmployeeAsync(int employeeId, int positionId); // למחוק תפקיד מהעובד

    }
}
