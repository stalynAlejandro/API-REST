using KeTePongo.ConsumerWebAPI.Models;
using System.ComponentModel;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class OrderSummaryProofEmailForConsumerViewModel
    {
        [DisplayName(nameof(Order))]
        public ConsumerOrder Order { get; set; }
        [DisplayName(nameof(Consumer))]
        public Consumer Consumer { get; set; }
    }
}
