using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.Core.Data
{
    public class YesSqlActionExecutor
    {
        static int seed = Environment.TickCount;

        static readonly ThreadLocal<Random> random =
            new ThreadLocal<Random>(() => new Random(Interlocked.Increment(ref seed)));

        internal static Random Random => random.Value;

        private readonly ILogger<YesSqlActionExecutor> _logger;
        public YesSqlActionExecutor(ILogger<YesSqlActionExecutor> logger)
        {
            _logger = logger;
        }
        public Task RetryActionIfConcurrencyExceptionAsync(Func<Task> asyncAction, int averageMillisecondsDelay = 10, int maxRetries = 100, CancellationToken? token = null)
        {
            return RetryActionIfConcurrencyExceptionAsync<bool>(async () => { await asyncAction(); return true; }, averageMillisecondsDelay, maxRetries, token);
        }
        public async Task<T> RetryActionIfConcurrencyExceptionAsync<T>(Func<Task<T>> asyncAction, int averageMillisecondsDelay = 10, int maxRetries = 100, CancellationToken? token = null)
        {
            var concurrentActionWasExecuted = false;
            var attempts = 0;
            T result = default(T);
            while (!concurrentActionWasExecuted)
            {
                try
                {
                    attempts++;
                    result = await asyncAction();
                    concurrentActionWasExecuted = true;
                }
                catch (ConcurrencyException e)
                {
                    var errorMsg = $"Concurrency error executing a db action, attempt {attempts} of maximum {maxRetries}";
                    _logger.LogInformation(e, errorMsg);
                    if (attempts > maxRetries)
                    {
                        _logger.LogError(e, errorMsg);
                        throw;
                    }
                    if (token.HasValue && token.Value.IsCancellationRequested)
                    {
                        return result;
                    }
                    var randomDelay = Random.Next((int)(averageMillisecondsDelay * 0.8), (int)(averageMillisecondsDelay * 1.2));
                    if (token.HasValue)
                    {
                        await Task.Delay(randomDelay, token.Value).ConfigureAwait(false);
                    }
                    else
                    {
                        await Task.Delay(randomDelay).ConfigureAwait(false);
                    }
                }
            }
            return result;
        }
    }
}
