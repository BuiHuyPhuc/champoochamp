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

    [Route("UpdateShoppingCart-{strShoppingCart}-{userEmail}")]
    public bool UpdateShoppingCart(string strShoppingCart, string userEmail)
    {
      return cartBusiness.UpdateShoppingCart(strShoppingCart, userEmail);
    }

    [Route("GetCartItem-{productId}-{colorId}-{sizeId}-{quantity}")]
    public CartItemModel GetCartItem(int productId, int colorId, int sizeId, int quantity)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          ProductVariant productVariant = db.ProductVariant.Where(p => p.ProductId == productId
            && p.ColorId == colorId
            && p.SizeId == sizeId
          ).SingleOrDefault();
          CartItemModel cartItemModel = new CartItemModel(productVariant, quantity);

          return cartItemModel;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    [Route("GetShoppingCart-{userEmail}||{strShoppingCart}")]
    public List<CartItemModel> GetShoppingCart(string userEmail, string strShoppingCart)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<CartItemModel> shoppingCart = new List<CartItemModel>();

          string strShoppingCarts = String.Empty;
          if (userEmail != "null")
          {
            strShoppingCarts = db.User.Where(p => p.Email == userEmail).Select(p => p.ShoppingCarts).SingleOrDefault();
          }
          else if (strShoppingCart != "null")
          {
            strShoppingCarts = strShoppingCart;
          }

          if (!String.IsNullOrEmpty(strShoppingCarts))
          {
            foreach (KeyValuePair<string, int> item in cartBusiness.getDictShoppingCarts(strShoppingCarts))
            {
              ProductVariant pv = db.ProductVariant.Where(p => p.Id == item.Key)
                                  .Include(p => p.Product)
                                  .Include(p => p.Color)
                                  .Include(p => p.Size)
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