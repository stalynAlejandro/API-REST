using KeTePongo.Core.Interfaces;
using System;

namespace KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument
{
    public class Provider : ILocalIdEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }

        public long? KeTePongoProviderOID { get; set; }
        public string TradeName { get; set; }
        //This Salesman when KeTePongoProviderId>0 should also have KeTePongoSalesmanId from de Provider,
        //and the only way of changing Salesman once it has KeTePongoProviderId>0 is selecting one of the salesman of the provider
        public Salesman Salesman { get; set; }
        public DayOfWeek[] OrderWeekDays { get; set; }
        public bool IsPendingToApprove { get; set; } = true;
    }
}
