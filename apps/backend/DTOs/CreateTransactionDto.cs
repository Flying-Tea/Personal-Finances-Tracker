namespace Backend.DTOs
{
    public record CreateTransactionDto(
        string Type,
        string Category,
        decimal Amount,
        string Description,
        DateTime Date
    );
}