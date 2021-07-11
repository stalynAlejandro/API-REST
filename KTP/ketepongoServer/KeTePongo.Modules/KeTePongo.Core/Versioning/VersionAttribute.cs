// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace KeTePongo.Core.Versioning
{
    public class VersionAttribute : Attribute, IActionConstraintFactory
    {
        public const string ApiVersionHeader = "api-version";
        private readonly IActionConstraint _constraint;

        // 5
        // [5]
        // (5)
        // (5]
        // [5)
        // (3-5)
        // (3-5]
        // [3-5)
        // [3-5]
        // [35-56]
        // Parses the above version formats and captures lb (lower bound), range, and hb (higher bound)
        // We filter out (5), (5], [5) manually after we do the parsing.
        //private static readonly Regex _versionParser = new Regex(@"^(?<lb>[\(\[])?(?<range>\d+(-\d+)?)(?<hb>[\)\]])?$");
        private static readonly Regex _versionParser = new Regex(@"^(?<lb>[\(\[])?(?<range>\d+(\.\d+)*(-\d+(\.\d+)*)?)(?<hb>[\)\]])?$");

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public VersionAttribute(string versionRange)
        {
            var constraint = CreateVersionConstraint(versionRange);

            if (constraint == null)
            {
                var message = string.Format("Invalid version format: {0}", versionRange);
                throw new ArgumentException(message, "versionRange");
            }

            _constraint = constraint;
        }

        private static IActionConstraint CreateVersionConstraint(string versionRange)
        {
            var match = _versionParser.Match(versionRange);

            if (!match.Success)
            {
                return null;
            }

            var lowerBound = match.Groups["lb"].Value;
            var higherBound = match.Groups["hb"].Value;
            var range = match.Groups["range"].Value;

            var rangeValues = range.Split('-');
            if (rangeValues.Length == 1)
            {
                return GetSingleVersionOrUnboundedHigherVersionConstraint(lowerBound, higherBound, rangeValues);
            }
            else
            {
                return GetBoundedRangeVersionConstraint(lowerBound, higherBound, rangeValues);
            }
        }

        private static IActionConstraint GetBoundedRangeVersionConstraint(
            string lowerBound,
            string higherBound,
            string[] rangeValues)
        {
            // [3-5, (3-5, 3-5], 3-5), 3-5 are not valid
            if (string.IsNullOrEmpty(lowerBound) || string.IsNullOrEmpty(higherBound))
            {
                return null;
            }

            var minVersion = new Version(rangeValues[0]);
            var maxVersion = new Version(rangeValues[1]);

            // Adjust min version and max version if the limit is exclusive.
            if (lowerBound == "(")
                minVersion = GetNextVersion(minVersion);
            if (higherBound == ")")
                maxVersion = GetPreviousVersion(maxVersion);

            if (minVersion.CompareTo(maxVersion) > 0)
            {
                return null;
            }

            return new VersionRangeValidator(minVersion, maxVersion);
        }

        private static Version GetNextVersion(Version version)
        {
            return new Version(version.Major + "." + version.Minor + "." + version.Build + "." + version.Revision + 1);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="version"></param>
        /// <returns></returns>
        private static Version GetPreviousVersion(Version version)
        {
            if (version.MinorRevision > 0)
                return new Version(version.Major + "." + version.Minor + "." + version.Build + "." + (version.Revision - 1));
            if (version.Build > 0)
                return new Version(version.Major + "." + version.Minor + "." + (version.Build - 1) + "." + int.MaxValue);
            if (version.Minor > 0)
                return new Version(version.Major + "." + (version.Minor - 1) + "." + int.MaxValue + "." + int.MaxValue);
            return new Version((version.Major - 1) + "." + int.MaxValue + "." + int.MaxValue + "." + int.MaxValue);
        }


        private static IActionConstraint GetSingleVersionOrUnboundedHigherVersionConstraint(
            string lowerBound,
            string higherBound,
            string[] rangeValues)
        {
            // (5], [5), (5), [5, (5, 5], 5) are not valid
            if (lowerBound == "(" || higherBound == ")" ||
                (string.IsNullOrEmpty(lowerBound) ^ string.IsNullOrEmpty(higherBound)))
            {
                return null;
            }

            var version = new Version(rangeValues[0]);
            if (!string.IsNullOrEmpty(lowerBound))
            {
                // [5]
                return new VersionRangeValidator(version, version);
            }
            else
            {
                // 5
                return new VersionRangeValidator(minVersion: version, maxVersion: null);
            }
        }

        public IActionConstraint CreateInstance(IServiceProvider services)
        {
            return _constraint;
        }
    }
}
