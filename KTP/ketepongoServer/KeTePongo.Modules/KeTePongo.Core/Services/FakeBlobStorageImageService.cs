using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public class FakeBlobStorageImageService : BlobStorageImageService
    {
        public FakeBlobStorageImageService():base()
        {
        }
        protected override async Task<string> UploadFileToBlobAsync(IFormFile file, string folderPath)
        {
            string fileName = GenerateFileName(Path.GetFileName(file.FileName), folderPath);

            var path = Path.Combine(Directory.GetCurrentDirectory(), "fakeAzureStorage", folderPath);
            Directory.CreateDirectory(path);
            path = Path.Combine(path, fileName);

            using (var bits = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(bits);
            }

            return "https://" + fileName;
        }

        public override Task RemoveImageAsync(string url)
        {
            return Task.CompletedTask;
        }
    }
}
