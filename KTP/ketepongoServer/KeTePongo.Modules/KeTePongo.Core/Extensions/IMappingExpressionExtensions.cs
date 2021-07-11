using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Core.Extensions
{
    public static class IMappingExpressionExtensions
    {
        static public IMappingExpression<TSource, TDestination> IgnoreNullProperties<TSource, TDestination>(this IMappingExpression<TSource, TDestination> mapping)
        {
            mapping.ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            return mapping;
        }
    }
}
