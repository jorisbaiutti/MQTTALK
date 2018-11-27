using System;

namespace MQTTalk.App.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Sent { get; set; }
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
        public Chat chat { get; set; }
    }
}