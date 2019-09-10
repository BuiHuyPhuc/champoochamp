using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class Employee
    {
        public Employee()
        {
            EmployeeGroupRules = new HashSet<EmployeeGroupRules>();
            Invoice = new HashSet<Invoice>();
            Post = new HashSet<Post>();
        }

        public short Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
        public short RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<EmployeeGroupRules> EmployeeGroupRules { get; set; }
        public virtual ICollection<Invoice> Invoice { get; set; }
        public virtual ICollection<Post> Post { get; set; }
    }
}
