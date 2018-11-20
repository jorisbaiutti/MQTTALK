using System.Collections.Generic;

namespace MQTTalk.App.Models
{
    public class Chat
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerUserId { get; set; }
        public string Description { get; set; }
        public List<Member> MemberUserList { get; set; }
        public List<Message> MessageList { get; set; }
    }
}