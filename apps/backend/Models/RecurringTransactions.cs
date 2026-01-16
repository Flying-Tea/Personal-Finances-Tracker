using backend.Models;

namespace Backend.Models
{
    public class RecurringTransaction
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }

        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? Description { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public RecurrenceType RecurrenceType { get; set; }

        public DateTime? LastRunAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
