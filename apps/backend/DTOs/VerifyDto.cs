using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public record VerifyDto(
        [Required, EmailAddress] string Email,
        [Required, StringLength(6, MinimumLength = 6)] string Code
    );
}
