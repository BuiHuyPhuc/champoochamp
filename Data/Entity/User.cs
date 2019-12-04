using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class User
    {
        public User()
        {
            Feedback = new HashSet<Feedback>();
            Invoice = new HashSet<Invoice>();
            Reviews = new HashSet<Reviews>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public string Favorites { get; set; }
        public string ShoppingCarts { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Feedback> Feedback { get; set; }
        public virtual ICollection<Invoice> Invoice { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
    }
}
