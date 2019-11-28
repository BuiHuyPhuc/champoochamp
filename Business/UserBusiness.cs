using Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
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
          password = PasswordConverter.MD5Hash_Encode(password);
          User user = db.User.Where(p => p.Email == email && p.Password == password).SingleOrDefault();
          return user;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
          return null;
        }
      }
    }

    public User register(User user)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          user.Password = PasswordConverter.MD5Hash_Encode(user.Password);
          db.User.Add(user);
          db.SaveChanges();
          return user;
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
