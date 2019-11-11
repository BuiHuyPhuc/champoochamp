using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class CartItemModel
  {
    public ProductVariant productVariant { get; set; }
    public int quantity { get; set; }

    public CartItemModel(ProductVariant productVariant, int quantity)
    {
      this.productVariant = productVariant;
      this.quantity = quantity;
    }
  }
}
