using Backend.Services;
using Microsoft.Extensions.Hosting;

public class CleanupService : BackgroundService
{
    private readonly IServiceProvider _services;

    public CleanupService(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _services.CreateScope();
            var authService = scope.ServiceProvider.GetRequiredService<AuthService>();

            await authService.DeleteUnverifiedUsersAsync();

            await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken); // runs every 30 mins
        }
    }
}
