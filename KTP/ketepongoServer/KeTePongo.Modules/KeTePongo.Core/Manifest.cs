using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "KeTePongo.Core",
    Author = "KeTePongo",
    Website = "http://ketepongo.com",
    Version = "0.0.0.0",
    Description = "This module provides core resources and services for KeTePongo modules.",
    Category = "KeTePongo",
    Dependencies = new[] { "OrchardCore.Users", "OrchardCore.Email" }
)]
