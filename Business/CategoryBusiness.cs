using Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Business
{
  public class CategoryBusiness
  {
    public Category GetCategoryById(int id)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          return db.Category.Where(p => p.Id == id).Include(p => p.Parent).ThenInclude(p => p.Parent).SingleOrDefault();
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
