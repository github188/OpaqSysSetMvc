using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OpaqSysSet.Model
{
    public class BigInfo : Netposa.Framework.Model.Enttiy<int>
    {
        public virtual string TableName { get; set; }
        public virtual string Col { get; set; }
        public virtual ValueType ValueType { get; set; }
        public virtual int Idx { get; set; }
    }
}
