using KeTePongo.SMS.Abstractions;
using OrchardCore.Entities;
using OrchardCore.Recipes.Models;
using OrchardCore.Recipes.Services;
using OrchardCore.Settings;
using System;
using System.Threading.Tasks;

namespace KeTePongo.SMS.Recipes
{
    public class SMSSettingsStep : IRecipeStepHandler
    {
        private readonly ISiteService _siteService;
        public SMSSettingsStep(ISiteService siteService) => _siteService = siteService;
        public async Task ExecuteAsync(RecipeExecutionContext context)
        {
            if (!string.Equals(context.Name, nameof(SMSSettings), StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var model = context.Step.ToObject<SMSSettingsStepModel>();
            var site = await _siteService.LoadSiteSettingsAsync();
            var settings = site.As<SMSSettings>();
            settings.API_KEY = model.API_KEY;
            settings.DeliveryMethod = model.DeliveryMethod;
            settings.IsLookupEnabled = model.IsLookupEnabled;
            settings.PickupDirectoryLocation = model.PickupDirectoryLocation;
            settings.Sender = model.Sender;
            site.Put<SMSSettings>(settings);

            await _siteService.UpdateSiteSettingsAsync(site);
        }
    }
}
