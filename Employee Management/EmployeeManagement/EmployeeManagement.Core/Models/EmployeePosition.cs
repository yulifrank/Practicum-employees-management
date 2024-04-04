using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Models
{
    public class EmployeePosition
    {
        public int EmployeeId { get; set;}
        public Employee Employee { get; set;}
        [Required]
        public int PositionId { get; set;}
        public Position Position { get; set;}
        [Required]
        public DateTime EntryDate { get; set; }
        [Required]
        public bool IsManagement { get; set; }
        public bool IsActive { get; set;}
        public EmployeePosition()
        {
            IsActive=true;  
        }
    }
}
