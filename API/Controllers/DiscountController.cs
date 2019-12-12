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
  public class DiscountController : ControllerBase
  {
    [Route("GetDiscountByCode-{code}")]
    public Discount GetDiscountCodeByCode(string code)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.Discount.Where(p => String.Compare(p.Code, code, false) == 0).SingleOrDefault();
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