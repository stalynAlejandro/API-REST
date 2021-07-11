using KeTePongo.Core.Interfaces;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class UpdateProviderDTO : NewProviderDTO, ILocalIdEntity
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }
    }
    public class ProviderDTO : INullableChangeVersion, ILocalIdEntity
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }

        [DisplayName(nameof(KeTePongoProviderOID))]
        public long? KeTePongoProviderOID { get; set; }

        [DisplayName(nameof(TradeName))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string TradeName { get; set; }

        [DisplayName(nameof(Salesman))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public SalesmanDTO Salesman { get; set; }

        [DisplayName(nameof(OrderWeekDays))]
        public DayOfWeek[] OrderWeekDays { get; set; }
        public bool IsPendingToApprove { get; set; } = true;
    }
    public class NewProviderDTO
    {
        [DisplayName(nameof(TradeName))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string TradeName { get; set; }

        [DisplayName(nameof(Salesman))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public UpdateSalesmanDTO Salesman { get; set; }

        [DisplayName(nameof(OrderWeekDays))]
        public DayOfWeek[] OrderWeekDays { get; set; }
    }
}
