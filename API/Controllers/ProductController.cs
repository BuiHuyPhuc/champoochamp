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
        try
        {
          return db.Product.Include(p => p.ProductVariant).ToList();
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [EnableQuery]
    [Route("GetProductsByCategoryId-{id}")]
    public IEnumerable<Product> GetProductsByIdCategory(int id)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<Product> productList = new List<Product>();
          Category category = db.Category.Where(p => p.Id == id)
                            .Include(p => p.InverseParent)
                              .ThenInclude(p => p.InverseParent)
                                .ThenInclude(p => p.Product)
                                  .ThenInclude(p => p.ProductVariant)
                                    .ThenInclude(p => p.Color)
                                  .ThenInclude(p => p.ProductVariant)
                                    .ThenInclude(p => p.ProductImages)
                            .Include(p => p.InverseParent)
                              .ThenInclude(p => p.Product)
                                .ThenInclude(p => p.ProductVariant)
                                  .ThenInclude(p => p.Color)
                                .ThenInclude(p => p.ProductVariant)
                                  .ThenInclude(p => p.ProductImages)
                            .Include(p => p.Product)
                              .ThenInclude(p => p.ProductVariant)
                                .ThenInclude(p => p.Color)
                              .ThenInclude(p => p.ProductVariant)
                                .ThenInclude(p => p.ProductImages)
                            .SingleOrDefault();
          productBusiness.GetProductsByCategory(category, ref productList);        

          return productList;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [EnableQuery]
    [Route("GetProductById-{id}")]
    public Product GetProductById(int id)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          Product product = db.Product.Where(p => p.Id == id)
            .Include(p => p.Brand).Include(p => p.Material).Include(p => p.Suplier)
            .Include(p => p.ProductVariant)
              .ThenInclude(p => p.Color)
            .Include(p => p.ProductVariant)
              .ThenInclude(p => p.Size)
            .Include(p => p.ProductVariant)
              .ThenInclude(p => p.ProductImages)
            .SingleOrDefault();

          return productBusiness.ShortProduct(product);
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