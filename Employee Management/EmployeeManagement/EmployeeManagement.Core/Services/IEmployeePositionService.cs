using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Services
{
    public interface IEmployeePositionService
    {
        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId); // לקבל את רשימת התפקידים של עובד מסוים
        Task<bool> DeletePositionFromEmployeeAsync(int employeeId, int positionId); // למחוק תפקיד מהעובד
        Task<EmployeePosition> GetEmployeePositionsByIdAsync(int employeeId, int positionId);

        Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId, int positionId, EmployeePosition employeePosition);
        Task<EmployeePosition> AddPositionToEmployeeAsync(int code ,EmployeePosition employeePosition); // להוסיף תפקיד לעובד

    }
}
