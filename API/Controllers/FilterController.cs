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
  public class FilterController : ControllerBase
  {
    FilterBusiness filterBusiness = new FilterBusiness();

    [EnableQuery]
    [Route("GetFilterGroupListByCategoryId-{id}")]
    public IEnumerable<FilterGroupModel> GetFilterGroupListByCategoryId(int id)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<FilterGroupModel> filterList = new List<FilterGroupModel>();

          List<Size> sizeList = db.Size
                                .Include(p => p.ProductVariant)
                                  .ThenInclude(p => p.Product)
                                    .ThenInclude(p => p.Category)
                                      .ThenInclude(p => p.Parent)
                                .ToList();

          List<Color> colorList = db.Color
                                .Include(p => p.ProductVariant)
                                  .ThenInclude(p => p.Product)
                                    .ThenInclude(p => p.Category)
                                      .ThenInclude(p => p.Parent)
                                .ToList();

          List<Brand> brandList = db.Brand
                                .Include(p => p.Product)
                                  .ThenInclude(p => p.Category)
                                    .ThenInclude(p => p.Parent)
                                .ToList();

          filterList.Add(new FilterGroupModel() { Name = Common.FilterGroupName.Size, Data = filterBusiness.GetFilterSizeList(sizeList, id) });
          filterList.Add(new FilterGroupModel() { Name = Common.FilterGroupName.Color, Data = filterBusiness.GetFilterColorList(colorList, id) });
          filterList.Add(new FilterGroupModel() { Name = Common.FilterGroupName.Money, Data = null });
          filterList.Add(new FilterGroupModel() { Name = Common.FilterGroupName.Brand, Data = filterBusiness.GetFilterBrandList(brandList, id) });

          return filterList;
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