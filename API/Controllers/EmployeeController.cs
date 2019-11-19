using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeeController : ControllerBase
  {
    EmployeeBusiness employeeBusiness = new EmployeeBusiness();

    [Route("CheckLogin")]
    [HttpPost]
    public Employee CheckLogin(Employee e)
    {
      return employeeBusiness.checkLogin(e.Email, e.Password);      
    }
  }
}