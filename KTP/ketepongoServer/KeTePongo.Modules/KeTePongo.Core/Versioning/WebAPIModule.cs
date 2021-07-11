using OrchardCore.Modules.Manifest;
using System;

namespace KeTePongo.Core.Versioning
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    public class APIModuleAttribute : ModuleAttribute
    {
        public APIModuleAttribute():base() { }
        public string APIVersion { get; set; }
        public string MinAPIVersionSupported { get; set; }
    }
}
