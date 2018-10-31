using System.Collections.Generic;

namespace MQTTalk.App.Services
{
    public class StaticJWTConfiguration : IJWTConfiguration
    {
        Dictionary<string, string> _configDictionary; 

        public StaticJWTConfiguration()
        {
            _configDictionary = new Dictionary<string, string>();
            _configDictionary.Add("ValidIssuer", "http://localhost/");
            _configDictionary.Add("SecretKey", "fc1d4f60-f18b-4bfc-829b-103e7d2f692c");
            _configDictionary.Add("TokenLifeTime", "30");
        }
        public Dictionary<string, string> getAll()
        {
            return _configDictionary;
        }

        public string GetConfiguration(string configuration)
        {
            return _configDictionary[configuration];
        }   
    }
}