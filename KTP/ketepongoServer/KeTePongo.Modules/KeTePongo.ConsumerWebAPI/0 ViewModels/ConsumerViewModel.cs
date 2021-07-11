using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class ConsumerViewModel
    {
        [DisplayName(nameof(Consumer))]
        public ConsumerDTO Consumer { get; set; }

        [DisplayName(nameof(SanitaryMeasuresString))]
        public string SanitaryMeasuresString { get; set; }

        [DisplayName(nameof(ImageFile))]
        public IFormFile ImageFile { get; set; }
    }
}
