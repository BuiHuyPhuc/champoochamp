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
    public User checkLogin(string email, string password)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          string passwordMD5 = PasswordConverter.MD5Hash_Encode(password);
          User user = db.User.Where(p => p.Email == email && p.Password == passwordMD5).SingleOrDefault();
          if(user != null)
          {
            user.Password = password;
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
          User u = db.User.Where(p => p.Email == user.Email).SingleOrDefault();
          if (u != null)
          {
            return 0;
          }

          user.Password = PasswordConverter.MD5Hash_Encode(user.Password);
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
          User user = db.User.Where(p => p.Email == email && p.VerificationCode == verificationCode).SingleOrDefault();
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
          User user = db.User.Where(p => p.Email == email).SingleOrDefault();
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
      while(code == verificationCode)
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
