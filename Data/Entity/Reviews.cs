using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Reviews
    {
        public int Id { get; set; }
        public float? SatisfactionRate { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? Status { get; set; }
        public int UserId { get; set; }
        public short ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
