using Data.Entity;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
  public class SearchBusiness
  {
    public void GetSearchData(IEnumerable<Object> lst, string GroupName, ref List<SearchModel> searchList)
    {
      foreach(var item in lst)
      {
        searchList.Add(new SearchModel() { Group = GroupName, Data = item });
      }
    }
  }
}
