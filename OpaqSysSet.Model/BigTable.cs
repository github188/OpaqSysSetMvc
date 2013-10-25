using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OpaqSysSet.Model
{
    public class BigTable : Netposa.Framework.Model.Enttiy<int>
    {
        //public virtual Database Db { get; set; }
        public virtual int DbId { get; set; }
        public virtual int SplitId { get; set; }
        public virtual string TableName { get; set; }
        public virtual string SplitCol { get; set; }
        public virtual string MinValue { get; set; }
        public virtual string MaxValue { get; set; }
        public virtual ValueType ValueType { get; set; }
        public virtual int SmallId { get; set; }
        public virtual string SmallName { get; set; }
        public virtual int Idx { get; set; }
    }
    public enum ValueType
    {
        Int,
        String
    }
}
