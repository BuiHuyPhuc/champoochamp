using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    CategoryBusiness categoryBusiness = new CategoryBusiness();

    [EnableQuery]
    [Route("GetAllCategories")]
    public IEnumerable<Category> GetAllCategories()
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.Category.ToList();
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [EnableQuery]
    [Route("GetCategoryById-{id}")]
    public Category GetCategoryById(int id)
    {
      return categoryBusiness.GetCategoryById(id);
    }
  }
}