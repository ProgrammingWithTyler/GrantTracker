using GrantTracker.Application.DTOs.Grants;
using GrantTracker.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace GrantTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GrantsController : ControllerBase
{
    private readonly IGrantService _grantService;
    private readonly ILogger<GrantsController> _logger;

    public GrantsController(
        IGrantService grantService,
        ILogger<GrantsController> logger)
    {
        _grantService = grantService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GrantDto>>> GetAll()
    {
        _logger.LogInformation("Retrieving all grants");
        var grants = await _grantService.GetAllAsync();
        return Ok(grants);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GrantDto>> GetById(Guid id)
    {
        _logger.LogInformation("Retrieving grant {Id}", id);
        var grant = await _grantService.GetByIdAsync(id);
        if (grant == null) 
        {
            _logger.LogWarning("Grant {Id} not found", id);
            return NotFound();
        }
        return Ok(grant);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateGrantDto dto)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid model state for grant creation");
            return BadRequest(ModelState);
        }

        try
        {
            _logger.LogInformation("Creating new grant with title: {Title}", dto.Title);
            var id = await _grantService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("Validation error creating grant: {Message}", ex.Message);
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error creating grant");
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateGrantDto dto)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid model state for grant {Id} update", id);
            return BadRequest(ModelState);
        }

        try
        {
            _logger.LogInformation("Updating grant {Id}", id);
            var success = await _grantService.UpdateAsync(id, dto);
            if (!success) 
            {
                _logger.LogWarning("Grant {Id} not found for update", id);
                return NotFound();
            }
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("Validation error updating grant {Id}: {Message}", id, ex.Message);
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error updating grant {Id}", id);
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            _logger.LogInformation("Attempting to delete grant {Id}", id);
            var success = await _grantService.DeleteAsync(id);
            if (!success) 
            {
                _logger.LogWarning("Grant {Id} not found for deletion", id);
                return NotFound();
            }
            
            _logger.LogInformation("Grant {Id} successfully deleted", id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error deleting grant {Id}", id);
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}