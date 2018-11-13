using System.Collections.Generic;
using MQTTalk.App.Models;

namespace MQTTalk.App.Data
{
    public interface IChatRepository
    {
        List<Chat> GetChats();
        Chat GetChat(int id);
        Chat CreateChat(Chat chat);
        Chat DeleteChat(int id);
        Chat UpdateChat(Chat chat);
        List<Message> GetMessages(Chat chat);
        Message GetMessage(int id);
        Message CreateMessage(Message message, Chat chat);
    }
}