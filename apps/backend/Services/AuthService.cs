using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace Backend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly SymmetricSecurityKey _jwtKey;

        // private readonly string _smtpEmail;
        // private readonly string _smtpPassword;

        public AuthService(AppDbContext db, string jwtKeyBase64)
        {
            _db = db;

            // I have made the decision to skip the 2fa email verification for now as I cannot forsee doing this without paying for an email service or domain.
            // The code is left here commented out for future reference.

            // Brevo SMTP credentials
            // _smtpEmail = Environment.GetEnvironmentVariable("BREVO_SMTP_EMAIL") ?? "your_verified_email@domain.com";
            // _smtpPassword = Environment.GetEnvironmentVariable("BREVO_SMTP_KEY") ?? "your_smtp_key";

            _jwtKey = new SymmetricSecurityKey(
                Convert.FromBase64String(jwtKeyBase64)
            );
        }

        // Password hashing
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
        public bool VerifyPassword(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);

        // JWT generation
        public string GenerateJwtToken(Guid userId, string email)
        {
            var creds = new SigningCredentials(_jwtKey, SecurityAlgorithms.HmacSha256);

            var now = DateTime.UtcNow;

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, email),

                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,
                    new DateTimeOffset(now).ToUnixTimeSeconds().ToString(),
                    ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                issuer: "your-app",
                audience: "your-app",
                claims: claims,
                notBefore: now,
                expires: now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // Send verification email via Brevo SMTP
        // public async Task SendVerificationEmailAsync(string toEmail, string code, string purpose)
        // {
        //     string subject = purpose == "register" ? "Verify your account" : "Verify your password change";

        //     string body = $@"
        //         <p>Your verification code is:</p>
        //         <h2>{code}</h2>
        //         <p>This code expires in 15 minutes.</p>
        //     ";

        //     var message = new MailMessage
        //     {
        //         From = new MailAddress(_smtpEmail, "My App"),
        //         Subject = subject,
        //         Body = body,
        //         IsBodyHtml = true
        //     };
        //     message.To.Add(toEmail);

        //     using var smtp = new SmtpClient("smtp-relay.sendinblue.com", 587)
        //     {
        //         Credentials = new NetworkCredential(_smtpEmail, _smtpPassword),
        //         EnableSsl = true
        //     };

        //     await smtp.SendMailAsync(message);
        // }

        // Verification code management
        public string GenerateCode() => new Random().Next(100000, 999999).ToString();

        public async Task SaveVerificationCodeAsync(Guid userId, string code, string purpose)
        {
            var record = new VerificationCode
            {
                UserId = userId,
                Code = code,
                Purpose = purpose,
                ExpiresAt = DateTime.UtcNow.AddMinutes(15),
                Used = false
            };

            _db.VerificationCodes.Add(record);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> VerifyCodeAsync(string email, string code, string purpose)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return false;

            var record = await _db.VerificationCodes
                .Where(v => v.UserId == user.Id && v.Code == code && v.Purpose == purpose && !v.Used && v.ExpiresAt > DateTime.UtcNow)
                .FirstOrDefaultAsync();

            if (record == null) return false;

            record.Used = true;
            await _db.SaveChangesAsync();

            if (purpose == "register")
            {
                user.IsVerified = true;
                await _db.SaveChangesAsync();
            }

            return true;
        }

        public async Task DeleteUnverifiedUsersAsync()
        {
            var cutoff = DateTime.UtcNow.AddHours(-2);

            var oldUsers = await _db.Users
                .Where(u => !u.IsVerified && u.CreatedAt <= cutoff)
                .ToListAsync();

            if (!oldUsers.Any()) return;

            var codesToDelete = await _db.VerificationCodes
                .Where(c => oldUsers.Select(u => u.Id).Contains(c.UserId))
                .ToListAsync();

            _db.VerificationCodes.RemoveRange(codesToDelete);
            _db.Users.RemoveRange(oldUsers);

            await _db.SaveChangesAsync();
        }
    }
}
