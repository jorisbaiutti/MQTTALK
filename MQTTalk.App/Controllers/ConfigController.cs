using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MQTTalk.App.Models;

namespace MQTTalk.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        private IConfiguration _config;

        public ConfigController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public ActionResult<MqttalkClientConfig> Get()
        {
            var mConf = new MqttalkClientConfig();
            _config.GetSection("Mqttalk:Client").Bind(mConf);
            return mConf;
        }
    }
}