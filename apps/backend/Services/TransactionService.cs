using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class TransactionService
{
    private readonly AppDbContext _db;

    public TransactionService(AppDbContext db)
    {
        _db = db;
    }

    public async Task AddTransactionAsync(
        Guid userId,
        CreateTransactionDto dto)
    {
        var estZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");

        var transaction = new Transaction
        {
            UserId = userId,
            Amount = dto.Amount,
            Type = dto.Type,
            Category = dto.Category,
            Description = dto.Description,
            Date = dto.Date,
            CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, estZone)
        };

        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync();
    }

    public async Task<List<Transaction>> GetUserTransactionsAsync(Guid userId)
    {
        return await _db.Transactions
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<bool> DeleteTranscationAsync(Guid userID, int transactionID)
    {
        var transaction = await _db.Transactions
            .Where(t => t.Id == transactionID && t.UserId == userID)
            .FirstOrDefaultAsync();

        if (transaction == null) return false;

        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync();

        return true;
    }
}
