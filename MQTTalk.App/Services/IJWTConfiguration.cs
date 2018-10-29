using System.Collections.Generic;

namespace MQTTalk.App.Services
{
    public interface IJWTConfiguration
    {
        string GetConfiguration(string Configuration);
        Dictionary<string, string> getAll();
    }
}