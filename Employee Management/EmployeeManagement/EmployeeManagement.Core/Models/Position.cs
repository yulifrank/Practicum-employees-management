﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Models
{
    public class Position
    {  
        public int PositionId { get; set; }
        [Required]
        public string PositionName { get; set; }
    
    
    }
}
