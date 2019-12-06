using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Suplier
    {
        public Suplier()
        {
            GoodsReceipt = new HashSet<GoodsReceipt>();
            Product = new HashSet<Product>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Logo { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<GoodsReceipt> GoodsReceipt { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
