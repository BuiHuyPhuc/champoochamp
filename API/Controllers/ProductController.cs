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
    public class ProductController : ControllerBase
    {
        ProductBusiness productBusiness = new ProductBusiness();

        [EnableQuery]
        [Route("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            using (champoochampContext db = new champoochampContext())
            {
                return db.Product.Include(p => p.ProductVariant).ToList();
            }
        }

        [EnableQuery]
        [Route("GetProductsByCategoryId-{id}")]
        public IEnumerable<Product> GetProductsByIdCategory(int id)
        {
            using (champoochampContext db = new champoochampContext())
            {
                Category category = db.Category.Where(p => p.Id == id)
                                    .Include(p => p.InverseParent)
                                        .ThenInclude(p => p.InverseParent)
                                            .ThenInclude(p => p.Product)
                                                .ThenInclude(p => p.ProductVariant)
                                    .Include(p => p.InverseParent)
                                        .ThenInclude(p => p.Product)
                                            .ThenInclude(p => p.ProductVariant)
                                    .Include(p => p.Product)
                                        .ThenInclude(p => p.ProductVariant)
                                    .SingleOrDefault();
                List<Product> result = new List<Product>();
                productBusiness.GetProductsByCategory(category, ref result);
                return result;
            }
        }
    }
}