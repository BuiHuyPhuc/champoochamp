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
    public class ProductController : ControllerBase
    {
        [EnableQuery]
        [Route("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            using (champoochampContext db = new champoochampContext())
            {
                return db.Product.Include(p => p.ProductVariant).ToList();
            }
        }
    }
}