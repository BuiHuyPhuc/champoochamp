using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Business
{
  public static class PasswordConverter
  {
    public static string MD5Hash_Encode(string input)
    {
      StringBuilder hash = new StringBuilder();
      MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
      byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

      for (int i = 0; i < bytes.Length; i++)
      {
        hash.Append(bytes[i].ToString("x2"));
      }
      return hash.ToString();
    }

    public static string MD5Hash_Decode(byte[] md5Array, bool isUpper)
    {
      var builder = new StringBuilder(md5Array.Length * 2);
      for (var i = 0; i < md5Array.Length; i++)
      {
        builder.Append(md5Array[i].ToString(isUpper ? "X2" : "x2"));
      }

      return builder.ToString();
    }
  }
}
