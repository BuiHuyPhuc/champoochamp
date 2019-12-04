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

    [HttpPost]
    [Route("UpdateShoppingCart")]
    public bool UpdateShoppingCart(User u)
    {
      return cartBusiness.UpdateShoppingCart(u);
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

    [HttpPost]
    [Route("GetShoppingCart")]
    public List<CartItemModel> GetShoppingCart(User u)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          List<CartItemModel> shoppingCartList = new List<CartItemModel>();

          string shoppingCarts = String.Empty;
          if (u.Email != null)
          {
            shoppingCarts = db.User.Where(p => p.Email == u.Email).Select(p => p.ShoppingCarts).SingleOrDefault();
          }
          else if (!string.IsNullOrEmpty(u.ShoppingCarts))
          {
            shoppingCarts = u.ShoppingCarts;
          }

          if (!String.IsNullOrEmpty(shoppingCarts))
          {
            foreach (KeyValuePair<string, int> item in cartBusiness.getDictShoppingCarts(shoppingCarts))
            {
              ProductVariant pv = db.ProductVariant.Where(p => p.Id == item.Key)
                                  .Include(p => p.Product)
                                  .Include(p => p.Color)
                                  .Include(p => p.Size)
                                  .SingleOrDefault();
              shoppingCartList.Add(new CartItemModel(productBusiness.ShortProductVariant(pv), item.Value));
            }
          }

          return shoppingCartList;
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