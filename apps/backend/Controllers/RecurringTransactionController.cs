using System.Security.Claims;
using backend.DTOs;
using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecurringTransactionProcess;

[ApiController]
[Route("api/recurring-transactions")]
[Authorize]
public class RecurringTransactionsController : ControllerBase
{
    private readonly RecurringTransactionService _service;

    public RecurringTransactionsController(
        RecurringTransactionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateRecurringTransactionDto dto)
    {
        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        await _service.CreateAsync(userId, dto);

        var processor = new RecurringTransactionProcessor(_service.GetDbContext());
        await processor.ProcessAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetMine()
    {
        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var recurring = await _service.GetUserRecurringAsync(userId);
        return Ok(recurring);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var deleted = await _service.DeleteAsync(userId, id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
