using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace MQTTalk.App.Signaling
{
    public class CustomUserProvider : IUserIdProvider
    {
        private UserManager<IdentityUser> _userManager;

        public CustomUserProvider(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        public string GetUserId(HubConnectionContext connection)
        {
            var appUser = _userManager.Users.SingleOrDefault(u => u.Email == connection.);
        }
    }
}