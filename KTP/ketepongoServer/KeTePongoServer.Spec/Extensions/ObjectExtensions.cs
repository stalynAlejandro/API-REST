using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace System
{
    public static class ObjectExtensions
    {
        public static MultipartFormDataContent GetMultipartFormDataContent(this object me)
        {
            var type = me.GetType();
            var content = new MultipartFormDataContent();
            foreach (var property in type.GetProperties())
            {
                if (IsPrimitive(property.PropertyType))
                {
                    var value = property.GetValue(me);
                    if (value == null)
                        continue;
                    content.Add(new StringContent(value.ToString()), property.Name);
                    continue;
                }
                if (property.PropertyType.Name != "IFormFile")
                {
                    content.Add(new StringContent(JsonConvert.SerializeObject(property.GetValue(me))), property.Name);
                    continue;
                }
                var formFile = property.GetValue(me) as FormFile;
                if (formFile == null)
                {
                    continue;
                }
                var streamContent = new StreamContent(formFile.OpenReadStream());
                content.Add(streamContent, property.Name, formFile.FileName);
                streamContent.Headers.ContentDisposition.FileNameStar = "";
            }
            return content;
        }
        private static bool IsPrimitive(Type t)
        {
            // TODO: put any type here that you consider as primitive as I didn't
            // quite understand what your definition of primitive type is
            return new[] {
                typeof(string),
                typeof(char),
                typeof(byte),
                typeof(sbyte),
                typeof(ushort),
                typeof(short),
                typeof(uint),
                typeof(int),
                typeof(ulong),
                typeof(long),
                typeof(float),
                typeof(double),
                typeof(decimal),
                typeof(DateTime),
            }.Contains(t);
        }
    }
}