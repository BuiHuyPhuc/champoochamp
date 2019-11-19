using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class PaymentModel
  {
    public User user { get; set; }
    public string shoppingCarts { get; set; }

    public PaymentModel(User user, string shoppingCarts)
    {
      this.user = user;
      this.shoppingCarts = shoppingCarts;
    }
  }
}
