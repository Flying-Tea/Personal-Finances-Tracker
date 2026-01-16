using backend.DTOs;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class RecurringTransactionService
{
    private readonly AppDbContext _db;

    public AppDbContext GetDbContext() => _db;


    public RecurringTransactionService(AppDbContext db)
    {
        _db = db;
    }

    public async Task CreateAsync(
        Guid userId,
        CreateRecurringTransactionDto dto)
    {
        var recurring = new RecurringTransaction
        {
            UserId = userId,
            Amount = dto.Amount,
            Type = dto.Type,
            Category = dto.Category,
            Description = dto.Description,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            RecurrenceType = dto.RecurrenceType,
            CreatedAt = DateTime.UtcNow
        };

        _db.RecurringTransactions.Add(recurring);
        await _db.SaveChangesAsync();
    }

    public async Task<List<RecurringTransaction>> GetUserRecurringAsync(Guid userId)
    {
        return await _db.RecurringTransactions
            .Where(r => r.UserId == userId)
            .OrderBy(r => r.StartDate)
            .ToListAsync();
    }

    public async Task<bool> DeleteAsync(Guid userId, int id)
    {
        var recurring = await _db.RecurringTransactions
            .FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);

        if (recurring == null)
            return false;

        _db.RecurringTransactions.Remove(recurring);
        await _db.SaveChangesAsync();
        return true;
    }
}
