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
          User user = db.User.Where(p => p.Email == userEmail).SingleOrDefault();

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
          return e.Message;
        }
      }
    }

    public bool UpdateShoppingCart(string strShoppingCart, string userEmail)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          User user = db.User.Where(p => p.Email == userEmail).SingleOrDefault();

          user.ShoppingCarts = strShoppingCart;
          db.SaveChanges();

          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
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
  }
}
