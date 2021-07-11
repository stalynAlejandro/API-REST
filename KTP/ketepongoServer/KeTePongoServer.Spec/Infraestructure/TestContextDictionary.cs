using AutoMapper;
using KeTePongoServer.Spec.Model.v1_0;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace KeTePongoServer.Spec.Model.v0_1
{
    public class TestsSharedState
    {
        private ConcurrentDictionary<int, IntegrationTestsContext> _threadTestContextDictionary = new ConcurrentDictionary<int, IntegrationTestsContext>();
        public HttpClient HttpClient { get; set; }
        public TestServer Server { get; set; }
        public Dictionary<string, HubConnection> HubConnectionDictionary { get; set; }
        public Dictionary<string, int> SignalRStatusDictionary { get; set; }
        public IMapper Mapper { get; set; }
        public IntegrationTestsContext TestContext { 
            get 
            {
                var key = Thread.CurrentThread.ManagedThreadId;
                if (!_threadTestContextDictionary.ContainsKey(key))
                {
                    var result = new IntegrationTestsContext();
                    _threadTestContextDictionary.TryAdd(key, result);
                    return result;
                }
                else
                {
                    return _threadTestContextDictionary[key];
                }
            } 
        }
    }
}
