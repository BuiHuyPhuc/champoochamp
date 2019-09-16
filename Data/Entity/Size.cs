using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Size
    {
        public Size()
        {
            ProductVariant = new HashSet<ProductVariant>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public short? DisplayOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
        public short CategoryId { get; set; }

        public virtual ICollection<ProductVariant> ProductVariant { get; set; }
    }
}
