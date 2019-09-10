using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class PostTag
    {
        public short Id { get; set; }
        public short PostId { get; set; }
        public short TagId { get; set; }

        public virtual Post Post { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
