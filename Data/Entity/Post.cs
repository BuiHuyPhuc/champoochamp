using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Post
    {
        public Post()
        {
            PostTag = new HashSet<PostTag>();
        }

        public short Id { get; set; }
        public string Content { get; set; }
        public string MetaTittle { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescriptions { get; set; }
        public int? Views { get; set; }
        public bool? Status { get; set; }
        public string Tags { get; set; }
        public short EmployeeId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual ICollection<PostTag> PostTag { get; set; }
    }
}
