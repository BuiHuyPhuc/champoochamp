using Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Business
{
  public class ProductBusiness
  {
    public void GetProductsByCategories(List<Category> categoryList, ref List<Product> productList)
    {
      if (categoryList.Count > 0)
      {
        foreach(Category item in categoryList)
        {
          GetProductsByCategory(item, ref productList);
        }
      }
    }

    public void GetProductsByCategory(Category category, ref List<Product> productList)
    {
      if (category != null)
      {
        if (category.InverseParent.Count > 0)
        {
          foreach (Category item in category.InverseParent)
          {
            GetProductsByCategory(item, ref productList);
          }
        }
        else
        {
          CombineProducts(category.Product, ref productList);
        }
      }
    }

    public void CombineProducts(ICollection<Product> productList, ref List<Product> result)
    {
      if (productList.Count > 0)
      {
        foreach (Product p in productList)
        {
          p.Category = null;
          foreach (ProductVariant pv in p.ProductVariant)
          {
            pv.Color.ProductVariant = null;
            pv.ProductImages.ProductVariant = null;
          }

          result.Add(p);
        }
      }
    }

    public List<Product> ShortProductList(List<Product> productList)
    {
      foreach (Product p in productList)
      {
        foreach (ProductVariant pv in p.ProductVariant)
        {
          pv.Color.ProductVariant = null;
        }
      }

      return productList;
    }

    public Product ShortProduct(Product product)
    {
      foreach (ProductVariant pv in product.ProductVariant)
      {
        if(pv.Color != null)
        {
          pv.Color.ProductVariant = null;
        }
        if (pv.Size != null)
        {
          pv.Size.ProductVariant = null;
        }
        if (pv.ProductImages != null)
        {
          pv.ProductImages.ProductVariant = null;
        }
      }

      return product;
    }

    public ProductVariant ShortProductVariant(ProductVariant productVariant)
    {
      if (productVariant.Product != null)
      {
        productVariant.Product.ProductVariant = null;
      }
      if (productVariant.Color != null)
      {
        productVariant.Color.ProductVariant = null;
      }
      if (productVariant.Size != null)
      {
        productVariant.Size.ProductVariant = null;
      }

      return productVariant;
    }
  }
}
