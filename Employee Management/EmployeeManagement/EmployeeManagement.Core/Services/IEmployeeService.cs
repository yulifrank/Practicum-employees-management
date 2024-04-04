using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Services
{
    public interface IEmployeeService
    {
       Task< IEnumerable<Employee>> GetEmployeesAsync();
        Task< Employee> GetEmployeeByIdAsync(int id);
         Task<Employee> AddEmployeeAsync(Employee employee);
         Task<Employee> UpdateEmployeeAsync(int id, Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);

    }
}
