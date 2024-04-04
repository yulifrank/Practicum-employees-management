using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmployeeManagement.API.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<PositionPostModel, Position>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeePositionPostModel, EmployeePosition>().ReverseMap();
        



        }
    }

           
    
}
