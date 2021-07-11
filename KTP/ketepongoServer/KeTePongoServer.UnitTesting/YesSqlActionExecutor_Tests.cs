using KeTePongo.Core.Data;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongoServer.UnitTesting
{
    [TestFixture]
    public class YesSqlActionExecutor_Tests
    {
        private YesSqlActionExecutor _yesSqlActionExecutor;

        [SetUp]
        public void SetUp()
        {
            _yesSqlActionExecutor = new YesSqlActionExecutor(new NullLogger<YesSqlActionExecutor>());
        }

        [Test]
        public void YesSqlActionExecutor_Succesful_Action()
        {
            _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(() => Task.CompletedTask).GetAwaiter().GetResult();
        }
        [Test]
        public void YesSqlActionExecutor_Action_Ending_With_Unexpected_Exception()
        {
            Assert.ThrowsAsync<NotImplementedException>(() => _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(() => throw new NotImplementedException()));

        }
        [Test]
        public void YesSqlActionExecutor_Action_Ending_Always_With_Concurrency_Exception()
        {
            Assert.ThrowsAsync<ConcurrencyException>(() => _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(() => throw new ConcurrencyException(), averageMillisecondsDelay: 1, maxRetries: 2));
        }
        [Test]
        public void YesSqlActionExecutor_Action_With_Some_ConcurrencyException()
        {
            var attempt = 1;
            _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(() =>
                {
                    if (attempt++ <= 2)
                    {
                        throw new ConcurrencyException();
                    }
                    return Task.CompletedTask;
                }
                , averageMillisecondsDelay: 1, maxRetries: 2).GetAwaiter().GetResult();
        }
    }
}