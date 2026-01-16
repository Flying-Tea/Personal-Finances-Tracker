using backend.Models;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace RecurringTransactionProcess
{
    // This is the ACT of creating a transaction from a recurring transaction
    public class RecurringTransactionProcessor
    {
        private readonly AppDbContext _db;
        private static readonly TimeZoneInfo EasternTime = 
        TimeZoneInfo.FindSystemTimeZoneById(
            OperatingSystem.IsWindows()
            ? "Eastern Standard Time"
            : "America/New_York"
        );


        public RecurringTransactionProcessor(AppDbContext db)
        {
            _db = db;
        }
        public async Task ProcessAsync()
        {
            var nowUtc = DateTime.UtcNow;
            var estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var nowEst = TimeZoneInfo.ConvertTimeFromUtc(nowUtc, estZone);

            var recurring = await _db.RecurringTransactions
                .Where(r => r.StartDate <= nowUtc && (r.EndDate == null || r.EndDate >= nowUtc))
                .ToListAsync();

            foreach (var r in recurring)
            {
                DateTime? nextRun;

                if (r.LastRunAt == null)
                {
                    // FIRST RUN: start exactly at StartDate
                    nextRun = TimeZoneInfo.ConvertTimeFromUtc(r.StartDate, estZone);
                }
                else
                {
                    nextRun = GetNextOccurrenceSafe(TimeZoneInfo.ConvertTimeFromUtc(r.LastRunAt.Value, estZone), r.RecurrenceType);
                }

                // Run transactions until nextRun is after now or past EndDate
                while (nextRun.HasValue && nextRun.Value <= nowEst && (r.EndDate == null || nextRun.Value <= TimeZoneInfo.ConvertTimeFromUtc(r.EndDate.Value, estZone)))
                {
                    _db.Transactions.Add(new Transaction
                    {
                        UserId = r.UserId,
                        Amount = r.Amount,
                        Type = r.Type,
                        Category = r.Category,
                        Description = r.Description,
                        Date = nowEst, 
                        CreatedAt = nowEst
                    });

                    r.LastRunAt = TimeZoneInfo.ConvertTimeToUtc(nextRun.Value, estZone); // store UTC
                    nextRun = GetNextOccurrenceSafe(nextRun.Value, r.RecurrenceType);
                }
            }

            await _db.SaveChangesAsync();
        }


        private static DateTime? GetNextOccurrenceSafe(DateTime date, RecurrenceType type)
        {
            try
            {
                return type switch
                {
                    RecurrenceType.Weekly => date.AddDays(7),
                    RecurrenceType.Biweekly => date.AddDays(14),
                    RecurrenceType.Monthly => date.AddMonths(1),
                    RecurrenceType.Quarterly => date.AddMonths(3),
                    RecurrenceType.Anually => date.AddYears(1),
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
            catch (ArgumentOutOfRangeException)
            {
                // If adding would overflow DateTime, return null
                return null;
            }
        }
    }
}