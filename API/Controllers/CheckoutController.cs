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
  public class CheckoutController : ControllerBase
  {
    CheckoutBusiness checkoutBusiness = new CheckoutBusiness();

    [HttpPost]
    [Route("SaveInVoice")]
    public bool SaveInVoice([FromBody]User user)
    {
      return true;
      //return paymentBusiness.SaveInVoice(strShoppingCart, user);
    }
  }
}