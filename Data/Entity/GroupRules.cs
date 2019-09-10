using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class GroupRules
    {
        public GroupRules()
        {
            EmployeeGroupRules = new HashSet<EmployeeGroupRules>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public DateTime CreatedDate { get; set; }
        public short CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? ModifiedBy { get; set; }
        public bool? Status { get; set; }
        public string Rules { get; set; }

        public virtual ICollection<EmployeeGroupRules> EmployeeGroupRules { get; set; }
    }
}
