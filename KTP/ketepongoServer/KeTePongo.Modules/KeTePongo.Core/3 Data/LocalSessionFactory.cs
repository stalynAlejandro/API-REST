using KeTePongo.Core.Services;
using KeTePongo.Core.YesSqlCollections;
using OrchardCore.Data;
using System.Collections.Generic;
using System.Linq;
using YesSql;

namespace KeTePongo.Core.Data
{
    public class LocalSessionFactory
    {
        IStore _store;
        IScopedIndexProvider[] _scopedIndexProviders;
        YesSQLCollectionNameService _collectionNameService;
        IIdForTypeGenerator _idForTypeGenerator;
        public LocalSessionFactory(IStore store, 
            IEnumerable<IScopedIndexProvider> scopedIndexProviders,
            YesSQLCollectionNameService collectionNameService,
            IIdForTypeGenerator idForTypeGenerator)
        {
            _store = store;
            _scopedIndexProviders = scopedIndexProviders.ToArray();
            _collectionNameService = collectionNameService;
            _idForTypeGenerator = idForTypeGenerator;
        }
        public ISession CreateSession(System.Data.IsolationLevel isolationLevel = System.Data.IsolationLevel.ReadUncommitted)
        {
            if (_store == null)
            {
                return null;
            }

            var session = new CollectionSession(_idForTypeGenerator, _store.CreateSession(isolationLevel), _collectionNameService);
            session.RegisterIndexes(_scopedIndexProviders);
            return session;
        }
    }
}
