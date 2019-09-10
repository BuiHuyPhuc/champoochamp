using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class GoodsReceipt
    {
        public GoodsReceipt()
        {
            GoodsReceiptDetail = new HashSet<GoodsReceiptDetail>();
        }

        public short Id { get; set; }
        public decimal? Total { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
        public short SuplierId { get; set; }

        public virtual Suplier Suplier { get; set; }
        public virtual ICollection<GoodsReceiptDetail> GoodsReceiptDetail { get; set; }
    }
}
