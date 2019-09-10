using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class ProductVariant
    {
        public ProductVariant()
        {
            GoodsReceiptDetail = new HashSet<GoodsReceiptDetail>();
            InvoiceDetail = new HashSet<InvoiceDetail>();
        }

        public string Id { get; set; }
        public short? Quantity { get; set; }
        public string Thumbnail { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
        public short ProductId { get; set; }
        public short ColorId { get; set; }
        public short SizeId { get; set; }
        public int ProductImagesId { get; set; }

        public virtual Color Color { get; set; }
        public virtual Product Product { get; set; }
        public virtual ProductImages ProductImages { get; set; }
        public virtual Size Size { get; set; }
        public virtual ICollection<GoodsReceiptDetail> GoodsReceiptDetail { get; set; }
        public virtual ICollection<InvoiceDetail> InvoiceDetail { get; set; }
    }
}
