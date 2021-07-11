using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.SMS.Models
{
    public enum ConcatMessage
    {
        No = 0,
        Yes
    }

    public class Message
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Text { get; set; }
        public string Send_At { get; set; }
        public string Custom { get; set; }
    }

    public class SMSRequest
    {
        public string Api_Key { get; set; }
        public string Report_Url { get; set; }

        //Set to 1 if you want to allow concatenated messages (more than 160 characters). If concat is 0 (or it's not present) only first 160 chars will be sent.
        public int Concat { get; set; }
        public IList<Message> Messages { get; set; }
    }
}