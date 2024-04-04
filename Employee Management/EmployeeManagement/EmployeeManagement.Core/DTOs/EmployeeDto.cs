using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.DTOs
{
    public class EmployeeDto
    {
        public int Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public Gender Gender { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime EmploymentStartDate { get; set; }

    }
}
