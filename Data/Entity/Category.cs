using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Category
    {
        public Category()
        {
            Product = new HashSet<Product>();
        }

        public short Id { get; set; }
        public short? ParentId { get; set; }
        public string Name { get; set; }
        public string MetaTitle { get; set; }
        public string Thumbnail { get; set; }
        public short? DisplayOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescriptions { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
