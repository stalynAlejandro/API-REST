using AutoMapper;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Notifications
{
    public class NotificationAutoMapperProfile: Profile
    {
        public NotificationAutoMapperProfile()
        {
            CreateMap<NotificationItem, NotificationItemDTO>().ReverseMap();
        } 
    }
}
