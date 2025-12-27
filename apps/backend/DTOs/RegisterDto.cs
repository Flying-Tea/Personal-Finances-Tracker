using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public record RegisterDto(
        [Required, EmailAddress] string email,
        [Required, MinLength(6)] string password
    );
}