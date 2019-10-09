using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class FilterGroup
  {
    public string Name { get; set; }
    public IEnumerable<Object> Data { get; set; }

    public FilterGroup()
    {
      Data = new List<Object>();
    }
  }
}
