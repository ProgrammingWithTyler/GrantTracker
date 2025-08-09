using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GrantTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantsController : ControllerBase
    {
        public GrantsController()
        {
            // Placeholder for future DI
        }

        [HttpGet]
        public IActionResult Get()
        {
            // Return 204 No Content for now
            return Ok("Inside GET grants controller.");
        }
    }
}
