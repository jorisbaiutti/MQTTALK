using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MQTTalk.App.Signaling
{
    public class WebRtcHub : Hub
    {
        public async Task SendOffer(string offer)
        {
            await Clients.Others.SendAsync("ReceiveOffer", offer);
        }

        public async Task SendAnswer(string answer)
        {
            await Clients.Others.SendAsync("ReceiveAnswer", answer);
        }

        public async Task SendIceCandidate(string candidate)
        {
            await Clients.Others.SendAsync("ReceiveIceCandidate", candidate);
        }
    }
}