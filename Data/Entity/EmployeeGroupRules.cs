using System;
using System.Collections.Generic;

namespace Data.Entity
{
    public partial class EmployeeGroupRules
    {
        public short Id { get; set; }
        public short EmployeeId { get; set; }
        public short GroupRulesId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual GroupRules GroupRules { get; set; }
    }
}
