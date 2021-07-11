using OrchardCore.ResourceManagement;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Theme
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(IResourceManifestBuilder builder)
        {
            var manifest = builder.Add();

            manifest.DefineScript("RestorePass").SetUrl("~/KeTePongo.Theme/js/restorepass.js");
            manifest.DefineScript("Login").SetUrl("~/KeTePongo.Theme/js/login.js");
            manifest.DefineStyle("DefaultCss").SetUrl("~/KeTePongo.Theme/css/default.css");
            manifest.DefineScript("IHaveCookies").SetUrl("~/KeTePongo.Theme/js/ihavecookies.js");
        }
    }
}
