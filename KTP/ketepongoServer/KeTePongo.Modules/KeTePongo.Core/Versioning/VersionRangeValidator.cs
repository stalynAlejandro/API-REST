// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System;

namespace KeTePongo.Core.Versioning
{
    public class VersionRangeValidator : IActionConstraint
    {
        private readonly Version _minVersion;
        private readonly Version _maxVersion;

        public int Order { get; set; }

        public VersionRangeValidator(Version minVersion, Version maxVersion)
        {
            _minVersion = minVersion;
            _maxVersion = maxVersion;
        }

        private Version GetVersion(HttpRequest request)
        {
            if (!string.IsNullOrWhiteSpace(request.Headers[VersionAttribute.ApiVersionHeader]))
                return new Version(request.Headers[VersionAttribute.ApiVersionHeader]);

            var maxVersion = _maxVersion != null ? _maxVersion.ToString() : _minVersion.ToString();
            var isDefaultversion = _minVersion != null && _maxVersion == null;
            return isDefaultversion ? _minVersion : null;
        }

        public bool Accept(ActionConstraintContext context)
        {
            var version = GetVersion(context.RouteContext.HttpContext.Request);
            if (version != null)
            {
                return (_minVersion == null || _minVersion.CompareTo(version) <= 0) &&
                    (_maxVersion == null || _maxVersion.CompareTo(version) >= 0);
            }
            else
            {
                return false;
            }
        }
    }
}