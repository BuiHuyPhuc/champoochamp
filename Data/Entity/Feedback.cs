using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? Status { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
