using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace KeTePongo.Core.Extensions
{
    public enum ImageFormat
    {
        bmp,
        jpeg,
        gif,
        tiff,
        png,
        unknown
    }
    public static class IFormFileExtensions
    {
        const string ImageContentTypePrefix = "image";
        
        public static bool IsImageFile(this IFormFile file)
        {
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }
            var realImageFormat = fileBytes.GetImageFormat();
            if (realImageFormat == ImageFormat.unknown)
            {
                return false;
            }
            if (realImageFormat == ImageFormat.bmp && file.ContentType != $"{ImageContentTypePrefix}/{ImageFormat.bmp}")
            {
                return false;
            }
            if (realImageFormat == ImageFormat.gif && file.ContentType != $"{ImageContentTypePrefix}/{ImageFormat.gif}")
            {
                return false;
            }
            if (realImageFormat == ImageFormat.jpeg && file.ContentType != $"{ImageContentTypePrefix}/{ImageFormat.jpeg}")
            {
                return false;
            }
            if (realImageFormat == ImageFormat.png && file.ContentType != $"{ImageContentTypePrefix}/{ImageFormat.png}")
            {
                return false;
            }
            if (realImageFormat == ImageFormat.tiff && file.ContentType != $"{ImageContentTypePrefix}/{ImageFormat.tiff}")
            {
                return false;
            }
            return true;
        }
    }
}
