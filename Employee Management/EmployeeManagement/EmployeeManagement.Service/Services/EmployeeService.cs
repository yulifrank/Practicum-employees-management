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
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;   
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            var existingEmployees = await _employeeRepository.GetAllEmployeesAsync();
            if (existingEmployees.Any(e => e.Identity == employee.Identity))
            {
                return null; 
            }

            return await _employeeRepository.AddEmployeeAsync(employee);
        }
        public async Task<bool> DeleteEmployeeAsync(int code)
        {
            return await _employeeRepository.DeleteEmployeeAsync(code);
        }
        public async Task<Employee> GetEmployeeByIdAsync(int code)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(code);
        }
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _employeeRepository.GetAllEmployeesAsync();
        }
        public async Task<Employee> UpdateEmployeeAsync(int code, Employee employee)
        {
         return  await _employeeRepository.UpdateEmployeeAsync(code, employee); 
        }
    }
}
