using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MQTTalk.App.Data;
using MQTTalk.App.Dtos;

namespace MQTTalk.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private IChatRepository _chatRepository;

        public ChatRoomController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }
        [HttpGet]
        [Authorize]
        public ActionResult<List<ChatRoomDto>> GetChatRooms()
        {
            var chats = _chatRepository.GetChats().Select(c => new ChatRoomDto()
            {
                Id = c.Id,
                Name = c.Name,
                OwnerUserId = c.OwnerUserId,
                Description = c.Description,
                MemberUserList = c.MemberUserList.Select(u => new UserDto()
                {
                    Id = u.UserId,
                    Email = u.EMail,
                    online = true
                }).ToList(),
                MessageList = c.MessageList.Select(m => new MessageDto()
                {
                    Id = m.Id,
                    Sent = m.Sent,
                    FromUserId = m.FromUserId,
                    ToUserId = m.ToUserId

                }).ToList()
            }).ToList();
            return Ok(chats);
        }


        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<ChatRoomDto> GetChatRoom(int id)
        {
            var chatRoom = _chatRepository.GetChat(id);
            var chatRoomDto = new ChatRoomDto()
            {
                Id = chatRoom.Id,
                Name = chatRoom.Name,
                OwnerUserId = chatRoom.OwnerUserId,
                Description = chatRoom.Description,
                MemberUserList = chatRoom.MemberUserList.Select(u => new UserDto()
                {
                    Id = u.UserId,
                    Email = u.EMail,
                    online = true
                }).ToList(),
                MessageList = chatRoom.MessageList.Select(m => new MessageDto()
                {
                    Id = m.Id,
                    Sent = m.Sent,
                    FromUserId = m.FromUserId,
                    ToUserId = m.ToUserId

                }).ToList()
            };

            return Ok(chatRoomDto);
        }

        [HttpPost]
        [Authorize]
        public ActionResult<ChatRoomDto> CreateChatRoom([FromBody] ChatRoomDto chatRoom)
        {
            return Ok("");
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<ChatRoomDto> DeleteChatRoom(int id)
        {
            return Ok("");
        }



    }
}