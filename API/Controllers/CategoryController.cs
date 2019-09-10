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
    public class CategoryController : ControllerBase
    {
        [Route("GetCategory")]
        public IEnumerable<Category> GetCategory()
        {
            using (champoochampContext db = new champoochampContext())
            {
                foreach (var item in db.Category.ToList())
                {
                    yield return item;
                }
            }
        }

    }
}