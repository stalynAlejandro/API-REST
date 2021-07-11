using AutoMapper;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Extensions;
using KeTePongo.UsersWebAPI.Models;
using KeTePongo.UsersWebAPI.ViewModels;
using OrchardCore.Entities;
using OrchardCore.OpenId.YesSql.Models;
using OrchardCore.Users.Models;
using System;
using ProviderDTOS = KeTePongo.ProviderWebAPI.Abstractions.DTOs;

namespace KeTePongo.UsersWebAPI
{
    public class UsersAutoMapperProfile: Profile
    {
        public class UserNameResolver : IValueResolver<User, UserDTO, string>
        {
            public string Resolve(User source, UserDTO destination, string member, ResolutionContext context)
            {
                return source.As<UserProfile>().Name;
            }
        }
        public class ConsumerOIDResolver : IValueResolver<User, UserDTO, long>
        {
            public long Resolve(User source, UserDTO destination, long member, ResolutionContext context)
            {
                return source.As<UserProfile>().ConsumerOID;
            }
        }
        public class ProviderOIDResolver : IValueResolver<User, UserDTO, long>
        {
            public long Resolve(User source, UserDTO destination, long member, ResolutionContext context)
            {
                return source.As<UserProfile>().ProviderOID;
            }
        }

        public UsersAutoMapperProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom<UserNameResolver>());
            CreateMap<User, NewUserBackOfficeDTO>()
                .ForMember(dto => dto.Name, opt => opt.MapFrom<UserNameResolver>())
                .ForMember(dto => dto.ConsumerOID, opt => opt.MapFrom<ConsumerOIDResolver>())
                .ForMember(dto => dto.ProviderOID, opt => opt.MapFrom<ProviderOIDResolver>());
            CreateMap<UserDTO, UpdatedUserDTO>();
            CreateMap<UserProfile, UpdatedUserDTO>();
            CreateMap<UpdatedUserDTO, UserProfile>();
            CreateMap<User, UserDTO>().ForMember(dto => dto.Name, opt => opt.MapFrom<UserNameResolver>());
            CreateMap<UserInvitationViewModel, NewUserDTO>();

            CreateMap<Provider, ProviderDTO>().ReverseMap();

            CreateMap<OpenIdApplication, OpenIdAppProviderDTO>()
                .ForMember(dto => dto.ProviderOID, opt => opt.MapFrom(dest => dest.GetOpenIdAppProviderOID()));
            //CreateMap<OpenIdAppProviderDTO, OpenIdApplication>();
            CreateMap<ProviderDTOS.ProviderDTO, ProviderDTO>()
                .ForMember(dto=>dto.ProviderOID, opt=>opt.MapFrom(src=>src.OID))
                .ReverseMap();
        }
    }
}
