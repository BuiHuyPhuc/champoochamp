using Data.Entity;
using Data.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Business
{
  public class CheckoutBusiness
  {
    public bool SaveInVoice(CheckoutModel checkoutModel)
    {
      using (champoochampContext db = new champoochampContext())
      {
        using (var transaction = db.Database.BeginTransaction())
        {
          try
          {
            bool result = false;
            Invoice invoice = getInvoice(checkoutModel);
            db.Add(invoice);
            db.SaveChanges();

            List<InvoiceDetail> invoiceDetailList = getInvoiceDetail(checkoutModel.shoppingCartList, invoice.Id);
            foreach (InvoiceDetail item in invoiceDetailList)
            {
              db.Add(item);
            }

            User user = db.User.Find(checkoutModel.user.Id);
            if(user != null)
            {
              user.ShoppingCarts = string.Empty;
            }
            db.SaveChanges();

            result = SendEmail(checkoutModel);

            transaction.Commit();
            return result;
          }
          catch (Exception e)
          {
            transaction.Rollback();
            return false;
          }
        }          
      }
    }

    public Invoice getInvoice(CheckoutModel checkoutModel)
    {
      User user = checkoutModel.user;

      Invoice invoice = new Invoice()
      {
        CustomerEmail = user.Email,
        CustomerName = user.Name,
        CustomerPhone = user.Phone,
        CustomerProvince = user.Province,
        CustomerDistrict = user.District,
        CustomerWard = user.Ward,
        CustomerAddress = user.Address,
        Message = checkoutModel.message,
        Total = checkoutModel.total,
        CreatedDate = DateTime.Now
      };

      if (user.Id > 0)
      {
        invoice.UserId = user.Id;
      }

      if (checkoutModel.discount != null)
      {
        invoice.DiscountId = checkoutModel.discount.Id;
      }

      return invoice;
    }

    public List<InvoiceDetail> getInvoiceDetail(List<CartItemModel> shoppingCartList, int invoiceId)
    {
      List<InvoiceDetail> invoiceDetaiList = new List<InvoiceDetail>();

      foreach (CartItemModel item in shoppingCartList)
      {
        InvoiceDetail detail = new InvoiceDetail()
        {
          PriceCurrent = item.productVariant.Product.PromotionPrice,
          Quantity = (short)item.quantity,
          Total = item.productVariant.Product.PromotionPrice * item.quantity,
          CreatedDate = DateTime.Now,
          ProductVariantId = item.productVariant.Id,
          InvoiceId = invoiceId
        };

        invoiceDetaiList.Add(detail);
      }

      return invoiceDetaiList;
    }

    public bool SendEmail(CheckoutModel checkoutModel)
    {
      try
      {
        User user = checkoutModel.user;

        //string body = string.Empty;
        //using (StreamReader reader = new StreamReader(Server.MapPath("~/HtmlTemplate.html")))
        //{
        //  body = reader.ReadToEnd();
        //}
        //body = body.Replace("{UserName}", userName);  
        //body = body.Replace("{Title}", title);
        //body = body.Replace("{message}", message);

        // Credentials
        var credentials = new NetworkCredential("no.reply.guitarshop@gmail.com", "guitarshop.com");
        // Mail message
        var mail = new MailMessage()
        {
          From = new MailAddress("no.reply.guitarshop@gmail.com"),
          Subject = "Email Sender App",
          Body = "Hello"
        };
        mail.IsBodyHtml = true;
        mail.To.Add(new MailAddress(user.Email));
        // Smtp client
        var client = new SmtpClient()
        {
          Port = 587,
          DeliveryMethod = SmtpDeliveryMethod.Network,
          UseDefaultCredentials = false,
          Host = "smtp.gmail.com",
          EnableSsl = true,
          Credentials = credentials
        };
        client.Send(mail);
        return true;
      }
      catch (System.Exception e)
      {
        return false;
      }

    }
  }  
}
