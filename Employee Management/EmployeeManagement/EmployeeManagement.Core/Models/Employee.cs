using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Models
{
    public enum Gender
    {
        Male,
        Female
    }
    public class Employee
    {
        [Key]
        public int Code { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Identity { get; set; }

        public Gender Gender { get; set; }

        [Required]
        public DateTime Birthdate { get; set; }

        [Required]
        public DateTime EmploymentStartDate { get; set; }

        public bool IsActive { get; set; }

        public Employee()
        {
            IsActive = true;
        }
    }

}
