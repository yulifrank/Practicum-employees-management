using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Models;
using EmployeeManagement.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;
        public PositionsController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var Positions = await _positionService.GetPositions();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(Positions));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel position)
        {
            var newPosition = await _positionService.AddPositionAsync(_mapper.Map<Position>(position));
            return Ok(newPosition);

        }
    }
}
