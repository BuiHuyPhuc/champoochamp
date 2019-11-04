using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Data.Entity;
using Data.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CartController : ControllerBase
  {
    CartBusiness cartBusiness = new CartBusiness();
    ProductBusiness productBusiness = new ProductBusiness();

    [Route("AddCartItem-{productId}-{colorId}-{sizeId}-{quantity}-{userEmail}")]
    public string AddCartItem(int productId, int colorId, int sizeId, int quantity, string userEmail)
    {
      return cartBusiness.AddCartItem(productId, colorId, sizeId, quantity, userEmail);
    }

    [Route("GetShoppingCart-{userEmail}")]
    public List<CartItemModel> GetShoppingCart(string userEmail)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<CartItemModel> shoppingCart = new List<CartItemModel>();

          string strShoppingCarts = db.User.Where(p => p.Email == userEmail).Select(p => p.ShoppingCarts).SingleOrDefault();
          if (!String.IsNullOrEmpty(strShoppingCarts))
          {
            foreach (KeyValuePair<string, int> item in cartBusiness.getDictShoppingCarts(strShoppingCarts))
            {
              ProductVariant pv = db.ProductVariant.Where(p => p.Id == item.Key)
                                  .Include(p => p.Product)
                                  .Include(p => p.Color)
                                  .SingleOrDefault();
              shoppingCart.Add(new CartItemModel(productBusiness.ShortProductVariant(pv), item.Value));
            }
          }          

          return shoppingCart;
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