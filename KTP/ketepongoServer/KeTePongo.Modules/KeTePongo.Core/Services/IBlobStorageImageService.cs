using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public interface IBlobStorageImageService
    {
        Task<string> UploadImageAsync(IFormFile file,string folderPath);
        Task RemoveImageAsync(string url);
        Task<string> CopyBlockBlobAsync(string currentUrl, string newUrl);
        Task RemoveNotNeededImagesAsync(HashSet<string> urlsInUse);
    }
}