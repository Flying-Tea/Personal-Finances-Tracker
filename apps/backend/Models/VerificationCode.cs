using System;

namespace Backend.Models
{
    public class VerificationCode
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserId { get; set; }

        public User User { get; set; } = null!;

        // 6-digit code
        public string Code { get; set; } = "";

        // Purpose: 'register' or 'password'
        public string Purpose { get; set; } = "";

        // Expiration timestamp
        public DateTime ExpiresAt { get; set; }

        // Has the code been used
        public bool Used { get; set; } = false;
    }
}
