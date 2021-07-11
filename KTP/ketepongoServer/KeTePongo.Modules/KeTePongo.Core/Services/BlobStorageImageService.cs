using KeTePongo.Core.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public class BlobStorageImageService : IBlobStorageImageService
    {
        private readonly Lazy<string> _azureStorageAccountName = new Lazy<string>(() => Environment.GetEnvironmentVariable("AzureStorageAccountName"));
        private readonly Lazy<string> _azureStorageAccountKey = new Lazy<string>(() => Environment.GetEnvironmentVariable("AzureStorageAccountKey"));
        private readonly Lazy<string> _containerName = new Lazy<string>(() => Environment.GetEnvironmentVariable("AzureStorageContainerName"));
        
        public Task<string> UploadImageAsync(IFormFile file, string folderPath) 
        {
            if (file != null && file.IsImageFile())
            {
                return UploadFileToBlobAsync(file, folderPath);
            }

            return Task.FromResult((string)null);
        }

        virtual public async Task RemoveImageAsync(string url)
        {
            CloudBlobContainer container = GetCloudBlobContainer();
            CloudBlockBlob blob = null;
            try
            {
                var blobid = url.Substring(container.Uri.ToString().Length + 1);
                blob = container.GetBlockBlobReference(blobid);
                var leaseId = await blob.AcquireLeaseAsync(null);
                if (blob != null)
                {
                   var isDeleted =  await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.None, new AccessCondition()
                    {
                        LeaseId = leaseId
                    }
                      , null, null);
                }
            }
            catch (Exception)
            {
                if (blob != null)
                {
                    await blob.FetchAttributesAsync();

                    if (blob.Properties.LeaseState != LeaseState.Available)
                    {
                        await blob.BreakLeaseAsync(new TimeSpan(0));
                    }
                }
            }
            await Task.CompletedTask;
        }

        protected virtual async Task<string> UploadFileToBlobAsync(IFormFile file, string folderPath)
        {
            CloudBlobContainer cloudBlobContainer = GetCloudBlobContainer();
            string fileName = GenerateFileName(Path.GetFileName(file.FileName), folderPath);
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            }
            CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
            using (var sourceStream = file.OpenReadStream())
            using (var image = Image.Load(sourceStream))
            {
                image.Mutate(ctx => ctx.Resize(new ResizeOptions() { Mode = ResizeMode.Min, Size = new Size(500, 500) }));
                using (var resultStream = new MemoryStream())
                {
                    image.SaveAsJpeg(resultStream);
                    cloudBlockBlob.Properties.ContentType = $"image/{ImageFormat.jpeg}";
                    resultStream.Position = 0;
                    await cloudBlockBlob.UploadFromStreamAsync(resultStream);
                    return cloudBlockBlob.Uri.AbsoluteUri;
                }
            }
        }

        public async Task<string> CopyBlockBlobAsync(string currentUrl,string newUrl)
        {

            CloudBlobContainer cloudBlobContainer = GetCloudBlobContainer();
            var containerUri = cloudBlobContainer.Uri.ToString();
            var blobid = currentUrl.Substring(containerUri.Length+1);

            CloudBlockBlob sourceBlob = null;
            CloudBlockBlob destBlob = null;
            string leaseId = null;
            bool existsBlob = true;
            try
            {
                // Get a block blob from the container to use as the source.
                sourceBlob = cloudBlobContainer.GetBlockBlobReference(blobid);

                // Lease the source blob for the copy operation 
                // to prevent another client from modifying it.
                // Specifying null for the lease interval creates an infinite lease.
                try
                {
                    leaseId = await sourceBlob.AcquireLeaseAsync(null);
                }
                catch (Exception)
                {
                    existsBlob = false;
                    return currentUrl;
                }

                // Get a reference to a destination blob (in this case, a new blob).
                destBlob = cloudBlobContainer.GetBlockBlobReference(newUrl);

                // Ensure that the source blob exists.
                if (await sourceBlob.ExistsAsync())
                {
                    // Get the ID of the copy operation.
                    string copyId = await destBlob.StartCopyAsync(sourceBlob);

                    // Fetch the destination blob's properties before checking the copy state.
                    await destBlob.FetchAttributesAsync();

                    Console.WriteLine("Status of copy operation: {0}", destBlob.CopyState.Status);
                    Console.WriteLine("Completion time: {0}", destBlob.CopyState.CompletionTime);
                    Console.WriteLine("Bytes copied: {0}", destBlob.CopyState.BytesCopied.ToString());
                    Console.WriteLine("Total bytes: {0}", destBlob.CopyState.TotalBytes.ToString());
                }
            }
            catch (StorageException e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
                throw;
            }
            finally
            {
                // Break the lease on the source blob.                   
                if (existsBlob && sourceBlob != null)
                {
                    await sourceBlob.FetchAttributesAsync();

                    if (sourceBlob.Properties.LeaseState != LeaseState.Available)
                    {
                        await sourceBlob.BreakLeaseAsync(new TimeSpan(0));
                    }
                }
            }
            return destBlob.Uri.AbsoluteUri;
        }

        private CloudBlobContainer GetCloudBlobContainer()
        {
            var _accessKey = $"DefaultEndpointsProtocol=https;AccountName={_azureStorageAccountName.Value};AccountKey={_azureStorageAccountKey.Value};EndpointSuffix=core.windows.net";
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_accessKey);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_containerName.Value);
            return cloudBlobContainer;
        }

        public async Task RemoveNotNeededImagesAsync(HashSet<string> urlsInUse)
        {
            CloudBlobContainer container = GetCloudBlobContainer();
            try
            {
                CloudBlobDirectory dira = container.GetDirectoryReference(string.Empty);
                var rootDirFolders = dira.ListBlobsSegmentedAsync(true, BlobListingDetails.Metadata, null, null, null, null).Result;

                foreach (var blob in rootDirFolders.Results)
                {
                    var url = blob.StorageUri.PrimaryUri.AbsoluteUri;
                    if (!urlsInUse.Contains(url))
                    {
                        await RemoveImageAsync(url);
                    }
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                // Break the lease on the source blob.                   
                if (container != null)
                {
                    await container.FetchAttributesAsync();

                    if (container.Properties.LeaseState != LeaseState.Available)
                    {
                        await container.BreakLeaseAsync(new TimeSpan(0));
                    }
                }
            }
        }
        protected string GenerateFileName(string fileName, string folderPath)
        {
            var extension = Path.GetExtension(fileName);
            return folderPath +"/"+Guid.NewGuid().ToString() + extension;
        }
    }
}
