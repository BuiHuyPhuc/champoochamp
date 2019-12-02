using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class CheckoutModel
  {
    public User user { get; set; }
    public List<CartItemModel> shoppingCartList { get; set; }
    public string message { get; set; }
    public Discount discount { get; set; }
    public decimal? total { get; set; }

    public CheckoutModel()
    {
      shoppingCartList = new List<CartItemModel>();
    }

    public CheckoutModel(User user, List<CartItemModel> shoppingCartList, string message, Discount discount, decimal? total)
    {
      this.user = user;
      this.shoppingCartList = shoppingCartList;
      this.message = message;
      this.discount = discount;
      this.total = total;
    }
  }
}
