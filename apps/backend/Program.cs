using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Backend.Data;
using Backend.Services;
using DotNetEnv;
using System.Text;

DotNetEnv.Env.Load(); // Load .env

var builder = WebApplication.CreateBuilder(args);

// Load environment variables

var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY")
    ?? throw new Exception("JWT_KEY missing in .env");

var dbPath = Path.Combine(AppContext.BaseDirectory, "app.db");

// Database setup
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}")
);

// JWT Authentication setup
var signingKey = new SymmetricSecurityKey(Convert.FromBase64String(jwtKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingKey,
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.FromMinutes(5)
        };
    });

// CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.AllowAnyOrigin() // Vite dev server
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Add HttpClient for AuthService (Mailgun)
builder.Services.AddHttpClient();

// Register AuthService as scoped (non-static)
builder.Services.AddScoped(sp =>
{
    var db = sp.GetRequiredService<AppDbContext>();
    var httpClient = sp.GetRequiredService<HttpClient>();
    return new AuthService(db, jwtKey);
});

// Server
builder.WebHost.UseUrls("http://0.0.0.0:5000");

// Add controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adds services
builder.Services.AddHostedService<CleanupService>();
builder.Services.AddScoped<TransactionService>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
