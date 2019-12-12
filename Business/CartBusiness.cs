using Data.Entity;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business
{
  public class CartBusiness
  {
    public string AddCartItem(int productId, int colorId, int sizeId, int quantity, string userEmail)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          ProductVariant productVariant = db.ProductVariant.Where(p => p.ProductId == productId
            && p.ColorId == colorId
            && p.SizeId == sizeId
          ).SingleOrDefault();
          User user = db.User.Where(p => String.Compare(p.Email, userEmail, false) == 0).SingleOrDefault();

          if (String.IsNullOrEmpty(user.ShoppingCarts))
          {
            user.ShoppingCarts = productVariant.Id + "-" + quantity;
          }
          else
          {
            user.ShoppingCarts += "," + productVariant.Id + "-" + quantity;
          }

          db.SaveChanges();
          return user.ShoppingCarts;
        }
        catch (Exception e)
        {
          return null;
        }
      }
    }

    public bool UpdateShoppingCart(User u)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          User user = db.User.Where(p => String.Compare(p.Email, u.Email, false) == 0).SingleOrDefault();
          user.ShoppingCarts = u.ShoppingCarts;
          db.SaveChanges();

          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }

    public bool checkProductQuantity(ProductVariant productVariant, string strShoppingCarts, int quantity)
    {
      if (productVariant.Quantity < quantity)
      {
        return false;
      }
      else
      {
        foreach (KeyValuePair<string, int> item in getDictShoppingCarts(strShoppingCarts))
        {
          if (item.Key.Equals(productVariant.Id) && productVariant.Quantity < item.Value + quantity)
          {
            return false;
          }
        }
      }

      return true;
    }

    public Dictionary<string, int> getDictShoppingCarts(string strShoppingCarts)
    {
      Dictionary<string, int> dictShoppingCarts = new Dictionary<string, int>();

      string[] arrShoppingCarts = strShoppingCarts.Split(",");
      for (int i = 0; i < arrShoppingCarts.Length; i++)
      {
        string[] item = arrShoppingCarts[i].Split("-");
        if (dictShoppingCarts.ContainsKey(item[0]))
        {
          dictShoppingCarts[item[0]] = dictShoppingCarts[item[0]] + Int32.Parse(item[1]);
        }
        else
        {
          dictShoppingCarts.Add(item[0], Int32.Parse(item[1]));
        }
      }

      return dictShoppingCarts;
    }

    public string getShoppingCarts(Dictionary<string, int> dictShoppingCarts)
    {
      string shoppingCarts = string.Empty;
      foreach (KeyValuePair<string, int> item in dictShoppingCarts)
      {
        if(item.Value > 0)
        {
          if (String.IsNullOrEmpty(shoppingCarts))
          {
            shoppingCarts += item.Key + "-" + item.Value;
          }
          else
          {
            shoppingCarts += "," + item.Key + "-" + item.Value;
          }
        }             
      }

      return shoppingCarts;
    }
  }
}
