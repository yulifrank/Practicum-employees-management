using EmployeeManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.DTOs
{
    public class EmployeePositionDto
    {
        public int EmployeeId { get; set; }
        public EmployeeDto Employee { get; set; }
        public int PositionId { get; set; }
        public PositionDto Position { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
