using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Data.Model;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SearchController : ControllerBase
  {
    SearchBusiness searchBusiness = new SearchBusiness();
    ProductBusiness productBusiness = new ProductBusiness();

    [EnableQuery]
    [Route("GetSearchData")]
    public IEnumerable<SearchModel> GetSearchData()
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<SearchModel> searchList = new List<SearchModel>();
          var categories = db.Category.Select(p => new SearchItemModel(p.Id, p.Name, p.MetaTitle)).ToList();
          var products = db.Product.Select(p => new SearchItemModel(p.Id, p.Name, p.MetaTitle)).ToList();
          searchBusiness.GetSearchData(categories, Common.SearchGroupName.Category, ref searchList);
          searchBusiness.GetSearchData(products, Common.SearchGroupName.Product, ref searchList);

          return searchList;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [EnableQuery]
    [Route("GetProductsBySearchKey-{key}")]
    public IEnumerable<Product> GetProductsBySearchKey(string key)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<Product> productList = new List<Product>();
          List<Category> categoryList = db.Category.Where(p => p.Name == key)
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
                                        .ToList();
          productBusiness.GetProductsByCategories(categoryList, ref productList);

          List<Product> searchProductList = db.Product.Where(p => p.Name.Contains(key))
                                            .Include(p => p.ProductVariant)
                                              .ThenInclude(p => p.Color)
                                            .Include(p => p.ProductVariant)
                                              .ThenInclude(p => p.ProductImages)
                                            .ToList();
          productBusiness.CombineProducts(searchProductList, ref productList);

          return productList.Distinct();
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