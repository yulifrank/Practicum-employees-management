using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.DTOs
{
    public class PositionDto
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
    }
}
