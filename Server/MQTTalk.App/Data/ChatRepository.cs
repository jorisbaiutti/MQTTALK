using System.Collections.Generic;
using MQTTalk.App.Models;
using System.Linq;

namespace MQTTalk.App.Data
{
    public class ChatRepository : IChatRepository
    {
        private ChatDbContext _chatDbContext;

        public ChatRepository(ChatDbContext chatDbContext)
        {
            _chatDbContext = chatDbContext;
        }
        public Chat CreateChat(Chat chat)
        {
             _chatDbContext.Chats.Add(chat);
             _chatDbContext.SaveChanges();
             return chat;
        }

        public Message CreateMessage(Message message, Chat chat)
        {
            _chatDbContext.Messages.Add(message);
            return message;  
        }

        public Chat DeleteChat(int id)
        {
            var chatToDelete = GetChat(id);
            _chatDbContext.Chats.Remove(chatToDelete);
            _chatDbContext.SaveChanges();
            return chatToDelete;

        }

        public Chat GetChat(int id)
        {
            var chat = _chatDbContext.Chats.FirstOrDefault(c => c.Id == id);
            if(chat == null)
            {
                throw new MQTTALKDatabaseException("No Chat found in Database with requested ID");
            }
           return chat;
            
        }

        public List<Chat> GetChats()
        {
            var chats = _chatDbContext.Chats.ToList();
            return chats;
        }

        public Message GetMessage(int id)
        {
            var message = _chatDbContext.Messages.FirstOrDefault(m => m.Id == id);
            if (message == null)
            {
                throw new MQTTALKDatabaseException("No Message found in Database with requested ID");
            }
           return message;
        }

        public List<Message> GetMessages(Chat chat)
        {
            var messages = _chatDbContext.Messages.ToList();
            return messages;
        }

        public Chat UpdateChat(Chat chat)
        {
            _chatDbContext.Chats.Update(chat);
            _chatDbContext.SaveChanges();
            return GetChat(chat.Id);
        }
    }
}