using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CollectionController : ControllerBase
  {
    [Route("GetAllCollections")]
    public IEnumerable<Collection> GetAllCollections()
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.Collection.ToList();
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