using Data.Entity;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Business
{
  public class FilterBusiness
  {
    public List<Size> GetSizesByCategory(Category category)
    {
      using (champoochampContext db = new champoochampContext())
      {
        if (category.Parent == null)
        {
          return db.Size.ToList();
        }

        return db.Size.Where(p => p.CategoryId == category.Id || p.CategoryId == category.ParentId).ToList();
      }        
    }
  }
}
