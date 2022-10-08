using CrudApp.API.Data;
using CrudApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CrudApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly CrudAppDbContext _crudAppDbContext;
        public EmployeeController(CrudAppDbContext crudAppDbContext)
        {
            _crudAppDbContext = crudAppDbContext;
        }
        [HttpGet]
        public ActionResult GetAllEmployees()
        {
            return Ok(_crudAppDbContext.Employees);
        }

        [HttpGet("{id}")]
        public ActionResult GetEmployeeById(Guid id)
        {
            return Ok(_crudAppDbContext.Employees.Find(id));
        }

        [HttpPost]
        public ActionResult AddEmployee([FromBody] Employee employeeRequest)
        {
            if (employeeRequest == null) return BadRequest();
            try
            {
                employeeRequest.Id = Guid.NewGuid();
                _crudAppDbContext.Employees.Add(employeeRequest);
                _crudAppDbContext.SaveChanges();
                return Ok(employeeRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult EditEmployee([FromBody] Employee updateEmployeeRequest, Guid id)
        {
            try
            {
                if (updateEmployeeRequest == null || updateEmployeeRequest.Id != id) return BadRequest();
                var employee = _crudAppDbContext.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound();
                }
                else
                {
                    employee.Name = updateEmployeeRequest.Name;
                    employee.Email = updateEmployeeRequest.Email;
                    employee.Department = updateEmployeeRequest.Department;
                    _crudAppDbContext.SaveChanges();
                    return Ok(employee);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(Guid id)
        {
            var employee = _crudAppDbContext.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            _crudAppDbContext.Employees.Remove(employee);
            _crudAppDbContext.SaveChanges();
            return Ok(employee);
            
        }
    }
}