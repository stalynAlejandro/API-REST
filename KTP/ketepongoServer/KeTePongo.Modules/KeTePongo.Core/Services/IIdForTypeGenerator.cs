using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Core.Services
{
    public interface IIdForTypeGenerator
    {
        public long GenerateOIDForType<T>();
        public long GenerateOIDForType(Type type);
    }
}
