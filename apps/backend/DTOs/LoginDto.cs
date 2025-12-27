using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public record LoginDto(
        [Required, EmailAddress] string email,
        [Required] string password
    );
}