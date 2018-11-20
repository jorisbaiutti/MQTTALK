using System;

namespace MQTTalk.App.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Sent { get; set; }
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
    }
}