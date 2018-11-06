using System.Net;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MQTTalk.App.Controllers
{
    [Route("[controller]/[action]")]
    public class TestController : Controller
    {
        private UserManager<IdentityUser> _userManager;

        public TestController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        public IActionResult someData(){
            var model = _userManager.Users.FirstOrDefault(user => user.Email == "joris.baiutti@gmail.com");
            return Ok(model);
        }
    }
}

