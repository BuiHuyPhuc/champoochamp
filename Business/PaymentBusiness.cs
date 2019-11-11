using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
  public class PaymentBusiness
  {
    public bool SaveInVoice(string strShoppingCart, User user)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          

          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }
  }
}
