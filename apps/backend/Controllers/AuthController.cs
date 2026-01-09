using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.DTOs;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db, AuthService authService)
    {
        _db = db;
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.email))
            return BadRequest("Email already exists");

        var user = new Backend.Models.User
        {
            Email = dto.email,
            PasswordHash = _authService.HashPassword(dto.password),
            IsVerified = false
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var code = _authService.GenerateCode();
        await _authService.SaveVerificationCodeAsync(user.Id, code, "register");

        // Do NOT fail registration if email fails (More email data)
        // try
        // {
        //     // await _authService.SendVerificationEmailAsync(user.Email, code, "register"); Email sending disabled for now
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine("Email send failed: " + ex.Message);
        // }
        
        // Outputs JWT before verification typically it would be after but im not enforcing verification for now
        return Ok(new { message = "User created. Please verify your email."});
    }

    [HttpPost("verify")]
    public async Task<IActionResult> Verify(VerifyDto dto)
    {
        var verified = await _authService.VerifyCodeAsync(dto.Email, dto.Code, "register");
        if (!verified)
            return BadRequest("Invalid or expired code");

        return Ok(new { message = "Account verified successfully" });
    }

    [HttpPost("resend-verification")]
    public async Task<IActionResult> ResendVerification([FromQuery] string email)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

        // Silent success (prevents email enumeration)
        if (user == null || user.IsVerified)
            return Ok();

        var code = _authService.GenerateCode();
        await _authService.SaveVerificationCodeAsync(user.Id, code, "register");

        // try (More Email Data)
        // {
        //     // await _authService.SendVerificationEmailAsync(user.Email, code, "register"); Email sending disabled for now
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine("Email resend failed: " + ex.Message);
        // }

        return Ok(new { message = "Verification email resent" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.email);
        if (user == null || !_authService.VerifyPassword(dto.password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        // if (!user.IsVerified)
        //     return Unauthorized("Account not verified");

        var token = _authService.GenerateJwtToken(user.Id, user.Email);
        Console.WriteLine("Generated Token: " + token);
        return Ok(new { token});
    }

    [HttpPost("password-reset-request")]
    public async Task<IActionResult> PasswordResetRequest([FromQuery] string email)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
            return Ok();

        var code = _authService.GenerateCode();
        await _authService.SaveVerificationCodeAsync(user.Id, code, "password");

        // try (More Email Data)
        // {
        //     // await _authService.SendVerificationEmailAsync(user.Email, code, "password"); Email sending disabled for now 
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine("Password reset email failed: " + ex.Message);
        // }

        return Ok(new { message = "If the email exists, a reset code was sent." });
    }

    [HttpPost("password-reset-verify")]
    public async Task<IActionResult> PasswordResetVerify([FromQuery] string email, [FromQuery] string code, [FromQuery] string newPassword) 
    {
        var verified = await _authService.VerifyCodeAsync(email, code, "password");
        if (!verified)
            return BadRequest("Invalid or expired code");

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return BadRequest();

        user.PasswordHash = _authService.HashPassword(newPassword);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Password changed successfully" });
    }
}
