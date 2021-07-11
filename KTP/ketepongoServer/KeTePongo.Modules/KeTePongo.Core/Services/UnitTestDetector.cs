using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace KeTePongo.Core.Services
{
    public static class UnitTestDetector
    {
        private static bool _runningFromNUnit = false;

        static UnitTestDetector()
        {
            foreach (Assembly assem in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assem.FullName.ToLowerInvariant().StartsWith("nunit.framework"))
                {
                    _runningFromNUnit = true;
                    break;
                }
            }
        }

        public static bool IsRunningFromNUnit
        {
            get { return _runningFromNUnit; }
        }
    }
}
