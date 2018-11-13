using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MQTTalk.App.Dtos;

namespace MQTTalk.App.Controllers
{
    [Route("api/controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public ActionResult<List<ChatRoomDto>> GetChatRooms()
        {
            return Ok("");
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<ChatRoomDto> GetChatRoom(int id)
        {
            return Ok("");
        }

        [HttpPost]
        [Authorize]
        public ActionResult<ChatRoomDto> CreateChatRoom([FromBody] ChatRoomDto chatRoom)
        {
            return Ok("");
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<ChatRoomDto> DeleteChatRoom(int id){
            return Ok("");
        }



    }
}