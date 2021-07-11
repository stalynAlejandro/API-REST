using OrchardCore.ResourceManagement;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ProviderWebAPI
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(IResourceManifestBuilder builder)
        {
            var manifest = builder.Add();

            var consumerWebAppScript = manifest.DefineScript("ConsumerWebApp").SetUrl("~/KeTePongo.ConsumerWebAPI/js/keTePongoConsumer.js");
            consumerWebAppScript.ShouldAppendVersion(true);
        }
    }
}
