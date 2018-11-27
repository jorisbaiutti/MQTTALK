using System.ComponentModel.DataAnnotations;

namespace MQTTalk.App.Models
{
    public class Member
    {
        [Key]
        public int UserId { get; set; }
    }
}