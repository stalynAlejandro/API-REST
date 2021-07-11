using System;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;


namespace KeTePongo.Core.Services
{

    public class Protector
    {
        private readonly IDataProtector _protector;
        public Protector(IDataProtectionProvider provider)
        {
            _protector = provider.CreateProtector("InvitationProtector");
        }
        public IDataProtector getProtector()
        {
            return _protector;
        }
    }
    public class InvitationTokenProvider : IInvitationTokenProvider
    {
        IDataProtector _protector;
        public TimeSpan tokenLifeSpan { get; set; }

        public InvitationTokenProvider()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDataProtection();
            var services = serviceCollection.BuildServiceProvider();
            _protector = ActivatorUtilities.CreateInstance<Protector>(services).getProtector();
            tokenLifeSpan = TimeSpan.FromDays(30);
        }

        public string GenerateInvitationToken(long oid, string email, int userType )
        {
            if (oid == 0)
            {
                throw new ArgumentNullException("Add some id To Encrypt");
            }
            var ms = new MemoryStream();
            using (var writer = new BinaryWriter(ms, new UTF8Encoding(false, true), true))
            {
                writer.Write(DateTimeOffset.UtcNow.UtcTicks);
                writer.Write(oid.ToString());
                writer.Write(email);
                writer.Write(Convert.ToString(userType.ToString(), CultureInfo.InvariantCulture));
                var protectedBytes = _protector.Protect(ms.ToArray());
                return Convert.ToBase64String(protectedBytes);
            }
        }
        public (long oid, string email, int userType) ValidateInvitationToken(string token)
        {
            try
            {
                var unprotectedData = _protector.Unprotect(Convert.FromBase64String(token));
                using (var reader = new BinaryReader(new MemoryStream(unprotectedData), new UTF8Encoding(false, true), true))
                {
                    var creationTime = new DateTimeOffset(reader.ReadInt64(), TimeSpan.Zero);
                    var expirationTime = creationTime + tokenLifeSpan;
                    if (expirationTime < DateTimeOffset.UtcNow)
                    {
                        return (0, null, 0);
                    }
                    var invitationOID = reader.ReadString();
                    var invitationEmail = reader.ReadString();
                    var invitationUserType = reader.ReadString();
                    return (long.Parse(invitationOID), invitationEmail, int.Parse(invitationUserType));
                }
            }
            catch
            {
                return (0, null, 0);
            }
        }
    }
}
