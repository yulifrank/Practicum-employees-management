using AutoMapper;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Models;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PositionDto, Position>().ReverseMap();
            CreateMap<EmployeePositionDto, EmployeePosition>().ReverseMap();
            CreateMap<EmployeeDto, Employee>().ReverseMap();

        }
    }
}

