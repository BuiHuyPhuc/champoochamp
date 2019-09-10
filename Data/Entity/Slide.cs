using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Slide
    {
        public short Id { get; set; }
        public string Image { get; set; }
        public short? DisplayOrder { get; set; }
        public string Link { get; set; }
        public string Discription { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
    }
}
