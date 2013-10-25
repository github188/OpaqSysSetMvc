using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OpaqSysSet.Model
{
    public class Database : Netposa.Framework.Model.Enttiy<int>
    {
        public virtual string Host { get; set; }
        public virtual string Port { get; set; }
        public virtual string User { get; set; }
        public virtual string Pass { get; set; }
        public virtual string Db { get; set; }
        public virtual DbType DbType { get; set; }
    }
    public enum DbType
    {
        Oracle = 0,
        MySql,
        MsSqlServer
    }
}
