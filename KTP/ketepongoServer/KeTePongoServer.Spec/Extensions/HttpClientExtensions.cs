using KeTePongo.Core.Versioning;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace KeTePongoServer.Spec.Extensions
{
    public static class HttpClientExtensions
    {
        public static Task<HttpResponseMessage> PostAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            return PostAsJsonAsync<T>(httpClient, url, data, "");
        }
        public static Task<HttpResponseMessage> PostAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PostAsync(url, content);
        }

        public static Task<HttpResponseMessage> PutAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            return PutAsJsonAsync<T>(httpClient, url, data, "");
        }

        public static Task<HttpResponseMessage> PutAsJsonAsync<T>(
           this HttpClient httpClient, string url, T data, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PutAsync(url, content);
        }
        public static Task<HttpResponseMessage> GetAsync(
          this HttpClient httpClient, string url, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.GetAsync(url);
        }
        public static Task<HttpResponseMessage> SendAsync(
          this HttpClient httpClient, HttpRequestMessage request, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.SendAsync(request);
        }
        
        public static async Task<T> ReadAsJsonAsync<T>(this HttpContent content)
        {
            var dataAsString = await content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(dataAsString);
        }
        public static Task<HttpResponseMessage> PostAsync(this HttpClient httpClient, string requestUri, HttpContent content, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.PostAsync(requestUri, content);
        }
        public static Task<HttpResponseMessage> PutAsync(this HttpClient httpClient, string requestUri, HttpContent content, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.PutAsync(requestUri, content);
        }
        public static Task<HttpResponseMessage> DeleteAsync(this HttpClient httpClient, string requestUri, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.DeleteAsync(requestUri);
        }
        public static Task<HttpResponseMessage> PostWithVersionAsync(this HttpClient httpClient, string requestUri, HttpContent content)
        {
            return PostWithVersionAsync(httpClient, requestUri, content, "");
        }
        public static Task<HttpResponseMessage> PostWithVersionAsync(this HttpClient httpClient, string requestUri, HttpContent content, string version)
        {
            SetHttpClientHeaderRequestVersion(httpClient, version);
            return httpClient.PostAsync(requestUri, content);
        }

        public static void SetHttpClientHeaderRequestVersion(HttpClient httpClient, string version)
        {
            if (string.IsNullOrEmpty(version))
                return;
            if (httpClient.DefaultRequestHeaders.Any(i => i.Key == VersionAttribute.ApiVersionHeader))
                httpClient.DefaultRequestHeaders.Remove(VersionAttribute.ApiVersionHeader);
            httpClient.DefaultRequestHeaders.Add(VersionAttribute.ApiVersionHeader, version);
        }
    }
}
