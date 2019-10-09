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

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FilterController : ControllerBase
  {
    FilterBusiness filterBusiness = new FilterBusiness();
    CategoryBusiness categoryBusiness = new CategoryBusiness();

    [EnableQuery]
    [Route("GetFilterGroupListByCategoryId-{id}")]
    public List<FilterGroup> GetFilterGroupListByCategoryId(int id)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          Category category = categoryBusiness.GetCategoryById(id);
          List<FilterGroup> filterList = new List<FilterGroup>();
          filterList.Add(new FilterGroup() { Name = Common.FilterGroupName.Size, Data = filterBusiness.GetSizesByCategory(category) });
          filterList.Add(new FilterGroup() { Name = Common.FilterGroupName.Color, Data = db.Color.ToList() });
          filterList.Add(new FilterGroup() { Name = Common.FilterGroupName.Money, Data = null });
          filterList.Add(new FilterGroup() { Name = Common.FilterGroupName.Brand, Data = db.Brand.ToList() });

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