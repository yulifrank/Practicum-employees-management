using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Models;
using EmployeeManagement.Core.Services;
using EmployeeManagement.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IEmployeePositionService _employeePositionService;
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IEmployeePositionService employeePositionService, IPositionService positionService, IMapper mapper)
        {
            _employeeService = employeeService;
            _employeePositionService = employeePositionService;
            _mapper = mapper;
            _positionService = positionService;
        }
        [HttpGet]
        public async Task<ActionResult<EmployeeDto>> Get()
        {
            var employees = await _employeeService.GetEmployeesAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }


        // GET api/<EmployeesControllers>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok( _mapper.Map<EmployeeDto>(employee));
       
        }

        // POST api/<EmployeesControllers>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(employee));
            return Ok(newEmployee);
        }

        // PUT api/<EmployeesControllers>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var updateEmployee = await _employeeService.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
            return Ok(updateEmployee);

        }

        // DELETE api/<EmployeesControllers>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _employeeService.DeleteEmployeeAsync(id);

        }

        //-----------------------------------------------------------------------------
        //----------------------------------position-----------------------------------
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------
        [HttpGet("{id}/position")]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetPositions(int id)
        {
            var employeePositions = await _employeePositionService.GetEmployeePositionsAsync(id);
       

            var positionDtos = _mapper.Map<IEnumerable<EmployeePositionDto>>(employeePositions);
            return Ok(positionDtos);
        }

        // POST api/<EmployeesController>/5/position
        [HttpPost("{id}/position")]
        public async Task<ActionResult<EmployeePosition>> AddPosition(int id, [FromBody] EmployeePositionPostModel employeePosition)
        {
            var newEmployeePosition = await _employeePositionService.AddPositionToEmployeeAsync(id, _mapper.Map<EmployeePosition>(employeePosition));
            if (newEmployeePosition == null)
            {
                return NotFound();
            }
            return Ok(newEmployeePosition);
        }
          [ HttpGet("{employeeId}/position/{positionId}")]
             public async Task<ActionResult> Get(int employeeId, int positionId)
        {
            var employeePosition = await _employeePositionService.GetEmployeePositionsByIdAsync(employeeId, positionId);
            return Ok(_mapper.Map<EmployeePositionDto>(employeePosition));
        }

        // PUT api/<EmployeesController>/5/position/6
        [HttpPut("{empId}/position/{positionId}")]
        public async Task<IActionResult> UpdatePosition(int empId, int positionId, [FromBody] EmployeePositionPostModel employeePosition)
        {
            var updateEmployeePosition = await _employeePositionService.UpdatePositionToEmployeeAsync(empId, positionId, _mapper.Map<EmployeePosition>(employeePosition));
            if (updateEmployeePosition == null)
            {
                return Ok(null);
            }
            return Ok(updateEmployeePosition);
        }

        // DELETE api/<EmployeesController>/5/position/6
        [HttpDelete("{id}/position/{positionId}")]
        public async Task<IActionResult> DeletePosition(int id, int positionId)
        {
            var result = await _employeePositionService.DeletePositionFromEmployeeAsync(id, positionId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }

      

     

    }
}
