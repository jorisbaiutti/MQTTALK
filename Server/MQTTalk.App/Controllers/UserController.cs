using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MQTTalk.App.Dtos;

namespace MQTTalk.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController()
        {
            
        }
        [HttpGet]
        [Authorize]
        public ActionResult<UserDto> GetUsers(){
            return Ok("");
        }
    }
}