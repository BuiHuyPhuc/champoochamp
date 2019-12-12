using Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Business
{
  public class UserBusiness
  {
    public User checkLogin(User u)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          string passwordMD5 = PasswordConverter.MD5Hash_Encode(u.Password);
          User user = db.User.Where(p => String.Compare(p.Email, u.Email, false) == 0 && p.Password == passwordMD5).SingleOrDefault();
          if (user != null && !String.IsNullOrEmpty(u.ShoppingCarts))
          {
            if(String.IsNullOrEmpty(user.ShoppingCarts))
            {
              user.ShoppingCarts = u.ShoppingCarts;
            }
            else
            {
              user.ShoppingCarts += "," + u.ShoppingCarts;
            }

            db.SaveChanges();

            user.Password = u.Password;
          }
          return user;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    public int register(User user)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          User u = db.User.Where(p => String.Compare(p.Email, user.Email, false) == 0).SingleOrDefault();
          if (u != null)
          {
            return 0;
          }          

          user.Password = PasswordConverter.MD5Hash_Encode(user.Password);
          if (String.IsNullOrEmpty(user.Avatar))
          {
            user.Avatar = "default.png";
          }
          db.User.Add(user);

          db.SaveChanges();
          return 1;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return -1;
        }
      }
    }

    public string forgetPassword(string email, string verificationCode, string password)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          User user = db.User.Where(p => String.Compare(p.Email, email, false) == 0 && p.VerificationCode == verificationCode).SingleOrDefault();
          if (user == null)
          {
            return null;
          }

          user.Password = PasswordConverter.MD5Hash_Encode(password);
          user.VerificationCode = string.Empty;

          db.SaveChanges();
          return email;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    public int sendVerificationCode(string email)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          User user = db.User.Where(p => String.Compare(p.Email, email, false) == 0).SingleOrDefault();
          if (user == null)
          {
            return 0;
          }

          user.VerificationCode = GetNewVerificationCode(new Random(), user.VerificationCode);
          if (!SendEmail(email, user.VerificationCode))
          {
            return -1;
          }

          db.SaveChanges();
          return 1;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return -1;
        }
      }
    }

    public string GetNewVerificationCode(Random rd, string verificationCode)
    {
      string code = rd.Next(100000, 999999).ToString();
      while (code == verificationCode)
      {
        code = rd.Next(100000, 999999).ToString();
      }

      return code;
    }

    public bool SendEmail(string email, string verificationCode)
    {
      try
      {
        // Credentials
        var credentials = new NetworkCredential("no.reply.guitarshop@gmail.com", "guitarshop.com");
        // Mail message
        var mail = new MailMessage()
        {
          From = new MailAddress("no.reply.guitarshop@gmail.com"),
          Subject = "Champoochamp gửi mã xác nhận",
          Body = "Mã xác nhận của bạn là: " + verificationCode
        };
        mail.IsBodyHtml = true;
        mail.To.Add(new MailAddress(email));
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
