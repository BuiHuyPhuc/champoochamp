using Data.Entity;
using System;
using System.Collections.Generic;

namespace Business
{
    public class ProductBusiness
    {
        public void GetProductsByCategory(Category category, ref List<Product> result)
        {
            if(category.InverseParent.Count > 0)
            {
                foreach(var item in category.InverseParent)
                {
                    GetProductsByCategory(item, ref result);
                }                
            }
            else
            {
                foreach (var item in category.Product)
                {
                    result.Add(item);
                }
            }
        }
    }
}
