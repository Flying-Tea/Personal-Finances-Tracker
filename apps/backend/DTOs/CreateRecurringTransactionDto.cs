using backend.Models;

namespace backend.DTOs
{
    public class CreateRecurringTransactionDto
    {
        public decimal Amount {get; set;}
        public string Type {get; set;} = string.Empty;
        public string Category {get; set;} = string.Empty;
        public string? Description {get; set;}

        public DateTime StartDate {get; set;}
        public DateTime? EndDate {get; set;}

        public RecurrenceType RecurrenceType {get; set;}
    }
}