using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    [Route("GetUserByEmail-{userEmail}")]
    public User GetUserByEmail(string userEmail)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.User.Where(p => p.Email == userEmail).SingleOrDefault();
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }
  }
}