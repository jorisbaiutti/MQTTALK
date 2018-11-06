using Microsoft.EntityFrameworkCore;
using MQTTalk.App.Models;

namespace MQTTalk.App.Data
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options)
           : base(options)
        {

        }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}