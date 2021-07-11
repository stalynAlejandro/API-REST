using KeTePongo.Core.Versioning;
using OrchardCore.Modules.Manifest;

[assembly: APIModule(
    Name = "KeTePongo.UsersWebAPI",
    Author = "KeTePongo",
    Website = "http://ketepongo.com",
    Version = "0.0.0.0",
    APIVersion = "0.0.0.0",
    MinAPIVersionSupported = "0.0.0.0",
    Description = " This module provides Web Api users management through Oauth server",
    Dependencies = new[] { "KeTePongo.Core", "OrchardCore.Users", "OrchardCore.OpenId", "KeTePongo.SMS" },
    Category = "KeTePongo"
)]
