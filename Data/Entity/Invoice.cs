using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceDetail = new HashSet<InvoiceDetail>();
        }

        public int Id { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerProvince { get; set; }
        public string CustomerDistrict { get; set; }
        public string CustomerWard { get; set; }
        public string CustomerAddress { get; set; }
        public string Message { get; set; }
        public decimal? ShipMoney { get; set; }
        public decimal? Total { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime? ShipDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public short? Status { get; set; }
        public short? DiscountId { get; set; }
        public int? UserId { get; set; }
        public short? EmployeeId { get; set; }

        public virtual Discount Discount { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<InvoiceDetail> InvoiceDetail { get; set; }
    }
}
