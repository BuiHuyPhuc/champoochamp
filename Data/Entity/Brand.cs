using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Brand
    {
        public Brand()
        {
            Product = new HashSet<Product>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public string MetaTitle { get; set; }
        public string Logo { get; set; }
        public short? DisplayOrder { get; set; }
        public string Country { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
