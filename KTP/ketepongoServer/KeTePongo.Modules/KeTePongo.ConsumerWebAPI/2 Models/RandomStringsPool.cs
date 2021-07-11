using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class RandomStringsPool
    {
        public string RandomString { get; set; }
        public bool IsUsed { get; set; }
    }
}
