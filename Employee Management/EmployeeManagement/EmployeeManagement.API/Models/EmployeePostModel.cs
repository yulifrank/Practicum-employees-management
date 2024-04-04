using EmployeeManagement.Core.Models;

namespace EmployeeManagement.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public Gender Gender { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime EmploymentStartDate { get; set; }
    }
}
