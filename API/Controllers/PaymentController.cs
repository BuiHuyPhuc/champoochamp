using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PaymentController : ControllerBase
  {
    PaymentBusiness paymentBusiness = new PaymentBusiness();

    [HttpPost]
    [Route("SaveInVoice")]
    public bool SaveInVoice(PaymentModel paymentModel)
    {
      return paymentBusiness.SaveInVoice(paymentModel);
    }

    [Route("GetAllInvoice")]
    public IEnumerable<Invoice> GetAllInvoice()
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.Invoice.ToList();
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