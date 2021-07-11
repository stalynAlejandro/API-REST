using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.Core.DTOs
{
    public class DeleteEntityDTO
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
        public int? ChangeVersion { get; set; }
    }
}
