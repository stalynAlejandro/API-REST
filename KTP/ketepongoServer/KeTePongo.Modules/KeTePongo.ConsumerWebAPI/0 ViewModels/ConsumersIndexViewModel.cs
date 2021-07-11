using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class ConsumersIndexViewModel
    {
        [DisplayName(nameof(Consumers))]
        public IEnumerable<ConsumerDTO> Consumers { get; set; }
        public dynamic Pager { get; set; }
    }
}
