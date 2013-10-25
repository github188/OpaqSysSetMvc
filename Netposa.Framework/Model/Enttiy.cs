using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netposa.Framework.Model
{
    public abstract class Enttiy<Key> : IEnity<Key>
    {
        /// <summary>
        /// ID
        /// </summary>
        public virtual Key Id { get; protected set; }
        /// <summary>
        /// 版本号
        /// </summary>
        public virtual int Version { get; set; }
        protected Enttiy()
        {
            this.Version = 0;
        }
        public override bool Equals(object obj)
        {
            return Equals(obj as Enttiy<Key>);
        }
        private static bool IsTransient(Enttiy<Key> obj)
        {
            return obj != null &&
                   Equals(obj.Id, default(Key));
        }
        private Type GetUnproxiedType()
        {
            return GetType();
        }
        public virtual bool Equals(Enttiy<Key> other)
        {
            if (other == null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            if (!IsTransient(this) &&
                !IsTransient(other) &&
                Equals(Id, other.Id))
            {
                var otherType = other.GetUnproxiedType();
                var thisType = GetUnproxiedType();
                return thisType.IsAssignableFrom(otherType) ||
                      otherType.IsAssignableFrom(thisType);
            }
            return false;
        }
        public override int GetHashCode()
        {
            if (Equals(Id, default(Key)))
                return base.GetHashCode();
            return Id.GetHashCode();
        }
    }
    public interface IEnity<Key>
    {

    }
    public abstract class BaseEntity : Enttiy<int>
    {
        public virtual void SetId(int key)
        {
            this.Id = key;
        }
    }
}
