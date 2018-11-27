using System.Collections.Generic;

namespace MQTTalk.App.Dtos
{
    public class ChatRoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerUserId { get; set; }
        public string Description { get; set; }
        public List<UserDto> MemberUserList { get; set; }
        public List<MessageDto> MessageList { get; set; }
    }
}