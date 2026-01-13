namespace Backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }

        public string Type { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public DateTime Date {get; set;}

        public DateTime CreatedAt { get; set; }
    }
}