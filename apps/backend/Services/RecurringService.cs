using Microsoft.Extensions.Hosting;
using RecurringTransactionProcess;

// Periodically check the recurring rules so it inserts missing transactions from the backend being offline

public class RecurringService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public RecurringService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var processor = scope.ServiceProvider.GetRequiredService<RecurringTransactionProcessor>();

            await processor.ProcessAsync();

            // Run every hour
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}