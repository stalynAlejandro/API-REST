using System;
using System.Collections.Generic;
using System.Text;
using YesSql;
using YesSql.Sql;

namespace KeTePongo.Core.Services
{
    public class KeTePongoIdGenerator : IIdForTypeGenerator
    {
        private BlockIdGenerator _blockIdGenerator;
        public KeTePongoIdGenerator(IStore store)
        {
           _blockIdGenerator = new BlockIdGenerator("identifiersPerType");
           _blockIdGenerator.InitializeAsync(store, null).GetAwaiter().GetResult();
        }
        public long GenerateOIDForType<T>()
        {
            return _blockIdGenerator.GetNextId(nameof(T));
        }
        public long GenerateOIDForType(Type t)
        {
            return _blockIdGenerator.GetNextId(t.Name);
        }
    }
}
