using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Core.AppServices
{
    static public class Constants
    {
        public const string KeTePonGoAppName = "KeTePongo";
        public const string CommonImagesFolder = "/KeTePongo.ConsumerWebAPI/Images/";
    }
    static public class Roles
    {
        public const string NoProviderUserRoleName = "No Provider User";
        public const string PendingProviderUserRoleName = "Pending Provider User";
        public const string ProviderUserRoleName = "Provider User";
        public const string ProviderAdminUserRoleName = "Provider Admin User";
        public const string ERPProviderRoleName = "ERP Provider";
        public const string NoConsumerUserRoleName = "No Consumer User";
        public const string PendingConsumerUserRoleName = "Pending Consumer User";
        public const string ConsumerUserRoleName = "Consumer User";
        public const string ConsumerAdminUserRoleName = "Consumer Admin User";
        public const string ConsumerAnonymousUserRoleName = "Consumer Anonymous User";
    }
    static public class Signals
    {
        public const string NewNotification = "NewNotificationSignal";
        public const string RegisterUser = "RegisterUserForNotificationsAsync";
    }
    static public class CrossModuleClaims
    {
        public const string ProviderOID = "provider_oid";
    }
}
