using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Product
    {
        public Product()
        {
            ProductVariant = new HashSet<ProductVariant>();
            Reviews = new HashSet<Reviews>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public string MetaTitle { get; set; }
        public decimal? Price { get; set; }
        public decimal? PromotionPrice { get; set; }
        public short? DiscountAmount { get; set; }
        public short? TotalQuantity { get; set; }
        public string Description { get; set; }
        public string Detail { get; set; }
        public string WarrantyPeriod { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescriptions { get; set; }
        public int? Views { get; set; }
        public bool? Status { get; set; }
        public short MaterialId { get; set; }
        public short BrandId { get; set; }
        public short CategoryId { get; set; }
        public short? CollectionId { get; set; }
        public short UnitId { get; set; }
        public short SuplierId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual Category Category { get; set; }
        public virtual Collection Collection { get; set; }
        public virtual Material Material { get; set; }
        public virtual Suplier Suplier { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual ICollection<ProductVariant> ProductVariant { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
    }
}
