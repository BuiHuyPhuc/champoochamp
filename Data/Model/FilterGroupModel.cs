using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class FilterGroupModel
  {
    public string Name { get; set; }
    public IEnumerable<Object> Data { get; set; }

    public FilterGroupModel()
    {
      Data = new List<Object>();
    }
  }
}
