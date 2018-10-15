using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MQTTalk.App.Signaling
{
    public class WebRtcHub : Hub
    {
        public async Task SendOffer(string user, string offer)
        {
            await Clients.All.SendAsync("ReceiveOffer", user, offer);
        }
    }
}