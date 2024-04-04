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
    public class EmployeeRepository: IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.Where(e => e.IsActive).ToListAsync();
        }
     
        public async Task<Employee> GetEmployeeByIdAsync(int code)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Code == code);
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(x => x.Identity == employee.Identity);
            if (existingEmployee != null)
            {
               return await UpdateEmployeeAsync(employee.Code, employee);   
            }
            else
            {
                _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();
                return employee;
            }
        }

        public async Task<Employee> UpdateEmployeeAsync(int code, Employee updatedEmployee)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Code == code);

            if (employee == null)
            {
                return null;
            }
            employee.FirstName = updatedEmployee.FirstName;
            employee.LastName = updatedEmployee.LastName;
            employee.Identity = updatedEmployee.Identity;
            employee.Gender = updatedEmployee.Gender;
            employee.Birthdate = updatedEmployee.Birthdate;
            employee.EmploymentStartDate= updatedEmployee.EmploymentStartDate;
            employee.IsActive = true;

            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<bool> DeleteEmployeeAsync(int code)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Code == code);

            if (employee != null)
            {
                employee.IsActive = false;
                var employeePositions = await _context.EmployeePositions.Where(ep => ep.EmployeeId == employee.Code).ToListAsync();
                employeePositions.ForEach(ep => ep.IsActive = false);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false; 
        }
 

    }
}
