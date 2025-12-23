using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Data;
using DotNetEnv;

DotNetEnv.Env.Load(); // load .env

var builder = WebApplication.CreateBuilder(args);

// Database setup
var dbUrl = Environment.GetEnvironmentVariable("DATABASE_URL") 
            ?? throw new Exception("DATABASE_URL missing in .env");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(dbUrl)
);

// JWT authentication setup
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") 
             ?? throw new Exception("JWT_KEY missing in .env");
var key = new SymmetricSecurityKey(Convert.FromBase64String(jwtKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key
        };
    });

// Controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
