using KeTePongo.Core.Versioning;
using OrchardCore.Modules.Manifest;

[assembly: APIModuleAttribute(
    Name = "KeTePongo.ConsumerWebAPI",
    Author = "KeTePongo",
    Website = "http://ketepongo.com",
    Version = "0.0.0.0",
    APIVersion = "0.2.0.0",
    MinAPIVersionSupported = "0.0.0.0",
    Description = " This module provides a web api backend for KeTePogo mobile app.",
    Dependencies = new[] { "KeTePongo.Core" },
    Category = "KeTePongo"
)]
