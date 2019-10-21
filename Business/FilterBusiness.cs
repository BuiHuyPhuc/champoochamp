using Data.Entity;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Business
{
  public class FilterBusiness
  {
    public List<Size> GetFilterSizeList(List<Size> sizeList, int categoryId)
    {
      List<Size> filterSizeList = new List<Size>();

      foreach (Size size in sizeList)
      {
        foreach (ProductVariant pv in size.ProductVariant)
        {
          if ((pv.Product.Category.Parent.ParentId == categoryId
            || pv.Product.Category.ParentId == categoryId
            || pv.Product.CategoryId == categoryId)
            && pv.Quantity > 0)
          {
            size.ProductVariant = null;
            filterSizeList.Add(size);
            break;
          }
        }
      }

      return filterSizeList;
    }

    public List<Color> GetFilterColorList(List<Color> colorList, int categoryId)
    {
      List<Color> filterColorList = new List<Color>();

      foreach (Color color in colorList)
      {
        foreach (ProductVariant pv in color.ProductVariant)
        {
          if ((pv.Product.Category.Parent.ParentId == categoryId
            || pv.Product.Category.ParentId == categoryId
            || pv.Product.CategoryId == categoryId)
            && pv.Quantity > 0)
          {
            color.ProductVariant = null;
            filterColorList.Add(color);
            break;
          }
        }
      }

      return filterColorList;
    }

    public List<Brand> GetFilterBrandList(List<Brand> brandList, int categoryId)
    {
      List<Brand> filterBrandList = new List<Brand>();

      foreach (Brand brand in brandList)
      {
        foreach (Product p in brand.Product)
        {
          if ((p.Category.Parent.ParentId == categoryId
            || p.Category.ParentId == categoryId
            || p.CategoryId == categoryId)
            && p.TotalQuantity > 0)
          {
            brand.Product = null;
            filterBrandList.Add(brand);
            break;
          }
        }
      }

      return filterBrandList;
    }
  }
}
