using System;
using System.Collections.Generic;
using System.Text;
using YesSql;
using YesSql.Collections;

namespace KeTePongo.Core.YesSqlCollections
{
    public class CollectionQuery : IQuery
    {
        private readonly IQuery _query;
        private readonly YesSQLCollectionNameService _yesSQLCollectionNameService;

        public CollectionQuery(IQuery query, YesSQLCollectionNameService yesSQLCollectionNameService)
        {
            _query = query;
            _yesSQLCollectionNameService = yesSQLCollectionNameService;
        }
        public IQuery<object> Any()
        {
            return _query.Any();
        }

        public IQuery<T> For<T>(bool filterType = true) where T : class
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(typeof(T));
            if (collectionName == null)
            {
                return _query.For<T>(filterType);
            }
            using (new NamedCollection(collectionName))
            {
                return _query.For<T>(filterType);
            }
        }

        IQueryIndex<T> IQuery.ForIndex<T>()
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(typeof(T));
            if (collectionName == null)
            {
                return _query.ForIndex<T>();
            }
            using (new NamedCollection(collectionName))
            {
                return _query.ForIndex<T>();
            }
        }
    }
}
