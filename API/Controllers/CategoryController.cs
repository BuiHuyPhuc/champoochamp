using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [EnableQuery]
        [Route("GetCategory")]
        public IEnumerable<Category> GetCategory()
        {
            using (champoochampContext db = new champoochampContext())
            {
                return db.Category.ToList();
            }
        }

        [EnableQuery]
        [Route("GetCategoryById-{id}")]
        public Category GetCategoryById(int id)
        {
            using (champoochampContext db = new champoochampContext())
            {
                return db.Category.Where(p => p.Id == id).Include(p => p.Parent).ThenInclude(p => p.Parent).SingleOrDefault();
            }
        }
    }
}