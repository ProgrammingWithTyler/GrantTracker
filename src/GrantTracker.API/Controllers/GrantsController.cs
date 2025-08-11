using GrantTracker.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace GrantTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantsController : ControllerBase
    {
        private readonly ILogger<GrantsController> _logger;
        private readonly IGrantRepository _repository;
        public GrantsController(ILogger<GrantsController> logger, IGrantRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var grants = await _repository.GetAllAsync();
            return Ok(grants);
        }
    }
}
