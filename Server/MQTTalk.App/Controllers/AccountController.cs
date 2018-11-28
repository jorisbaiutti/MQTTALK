using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MQTTalk.App.Dtos;
using Newtonsoft.Json.Linq;

namespace MQTTalk.App.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private UserManager<IdentityUser> _userManager;
        private SignInManager<IdentityUser> _signInManager;

        private IConfiguration _config;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration config
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(u => u.Email == model.Email);
                var token =  GenerateJwtToken(model.Email, appUser);
                var tokenResult = new JObject();
                tokenResult.Add("token", token);
                tokenResult.Add("expiresIn", DateTime.Now.AddDays(Convert.ToDouble(_config.GetValue<string>("Server:Jwt:TokenLifeTime"))));
                return Ok(tokenResult);
            }

            return Unauthorized();

            // throw new ApplicationException("INVALID_LOGIN_ATTEMPT");

        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                var token =  GenerateJwtToken(model.Email, user);
                var tokenResult = new JObject();
                tokenResult.Add("token", token);
                tokenResult.Add("expiresIn", DateTime.Now.AddDays(Convert.ToDouble(_config.GetValue<string>("Server:Jwt:TokenLifeTime"))));
                return Ok(tokenResult);
            }

            throw new ApplicationException("UNKNOWN_ERROR");
        }
        private string GenerateJwtToken(string email, IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("Server:Jwt:Secret")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_config.GetValue<string>("Server:Jwt:TokenLifeTime")));

            var token = new JwtSecurityToken(
                _config.GetValue<string>("Server:Jwt:Issuer"),
                _config.GetValue<string>("Server:Jwt:Issuer"),
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}