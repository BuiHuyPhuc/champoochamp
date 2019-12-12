using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    UserBusiness userBusiness = new UserBusiness();

    [Route("GetUserByEmail-{userEmail}")]
    public User GetUserByEmail(string userEmail)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.User.Where(p => String.Compare(p.Email, userEmail, false) == 0).SingleOrDefault();
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [Route("CheckLogin")]
    [HttpPost]
    public User CheckLogin(User user)
    {
      return userBusiness.checkLogin(user);
    }

    [Route("Register")]
    [HttpPost]
    public int Register(User user)
    {
      return userBusiness.register(user);
    }

    [Route("ForgetPassword")]
    [HttpPost]
    public string ForgetPassword(User user)
    {
      return userBusiness.forgetPassword(user.Email, user.VerificationCode, user.Password);
    }

    [Route("SendVerificationCode-{email}")]
    [HttpGet]
    public int SendVerificationCode(string email)
    {
      return userBusiness.sendVerificationCode(email);
    }
  }
}