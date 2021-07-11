using KeTePongo.Core.Versioning;
using OrchardCore.Modules.Manifest;

[assembly: APIModule(
    Name = "KeTePongo.Notifications",
    Author = "KeTePongo",
    Website = "http://ketepongo.com",
    Version = "0.0.0.0",
    APIVersion = "0.2.0.0",
    MinAPIVersionSupported = "0.0.0.0",
    Description = "This module provides a SignalR backend for notifications for KeTePongo provider and consumer mobile app.",
    Dependencies = new[] { "KeTePongo.Core"},
    Category = "KeTePongo"
)]