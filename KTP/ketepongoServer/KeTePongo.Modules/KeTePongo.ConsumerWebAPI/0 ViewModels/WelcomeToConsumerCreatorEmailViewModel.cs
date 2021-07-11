using KeTePongo.ConsumerWebAPI.Models;
using System.ComponentModel;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class WelcomeToConsumerCreatorEmailViewModel
    {
        [DisplayName(nameof(ConsumerUserProfile))]
        public ConsumerUserProfile ConsumerUserProfile { get; set; }
        [DisplayName(nameof(Consumer))]
        public Consumer Consumer { get; set; }
    }
}