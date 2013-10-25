using System.Collections;
using Netposa.Framework.Model;
using NHibernate.Engine;
using NHibernate.Mapping;
using NHibernate.Tuple.Entity;

namespace Netposa.Framework.Repositories
{
    class NullableTuplizer : PocoEntityTuplizer
    {
        public NullableTuplizer(EntityMetamodel entityMetamodel, PersistentClass mappedEntity)
            : base(entityMetamodel, mappedEntity)
        {
        }

        public override object[] GetPropertyValuesToInsert(
            object entity, IDictionary mergeMap, ISessionImplementor session)
        {
            //object[] values = base.GetPropertyValuesToInsert(entity, mergeMap, session);
            ////dirty hack 1
            //for (int i = 0; i < values.Length; i++)
            //{
            //    if (values[i] == null && typeof(BaseEntity).IsAssignableFrom(getters[i].ReturnType))
            //    {
            //        values[i] = ProxyFactory.GetProxy(0, null);
            //    }
            //}
            //return values;
            return base.GetPropertyValuesToInsert(entity, mergeMap, session);
        }

        public override object[] GetPropertyValues(object entity)
        {
            //object[] values = base.GetPropertyValues(entity);
            ////dirty hack 2
            //for (int i = 0; i < values.Length; i++)
            //{
            //    if (values[i] == null && typeof(BaseEntity).IsAssignableFrom(getters[i].ReturnType))
            //    {
            //        values[i] = ProxyFactory.GetProxy(0, null);
            //    }
            //}
            //return values;
            return base.GetPropertyValues(entity);
        }


        public override void SetPropertyValues(object entity, object[] values)
        {
            //dirty hack 3.
            for (int i = 0; i < values.Length; i++)
            {
                if (values[i] == null)
                {
                    continue;
                }
                if (typeof(BaseEntity).IsAssignableFrom(getters[i].ReturnType)
                    && ((BaseEntity)values[i]).Id == 0)
                {
                    values[i] = null;
                }
            }
            base.SetPropertyValues(entity, values);
        }
    }
}