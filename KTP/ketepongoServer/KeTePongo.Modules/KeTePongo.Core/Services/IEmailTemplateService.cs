using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public interface IEmailTemplateService
    {
        Task<bool> SendEmailAsync(string email, string subject, string body);
        Task<string> GetEmailBodyAsync(object model, string viewName);
        Task<string> GetEmailBodyAsync(object model, string viewName, string css);
    }
}