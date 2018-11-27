using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace MQTTalk.App.Signaling
{
    public class CustomUserProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            var user = connection.User.FindFirst("sub").Value;
            return user;
        }
    }
}