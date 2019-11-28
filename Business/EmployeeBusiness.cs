using Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business
{
  public class EmployeeBusiness
  {
    public Employee checkLogin(string email, string password)
    {
      using (champoochampContext db = new champoochampContext())
      {
        try
        {
          password = PasswordConverter.MD5Hash_Encode(password);
          Employee employee = db.Employee.Where(p => p.Email == email && p.Password == password).SingleOrDefault();
          return employee;
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
