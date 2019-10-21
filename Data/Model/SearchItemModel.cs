using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Model
{
  public class SearchItemModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string MetaTitle { get; set; }

    public SearchItemModel(int id, string name, string metatitle)
    {
      this.Id = id;
      this.Name = name;
      this.MetaTitle = metatitle;
    }
  }
}
