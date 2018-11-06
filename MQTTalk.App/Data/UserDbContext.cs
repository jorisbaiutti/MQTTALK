
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MQTTalk.App.Data
{
    public class UserDbContext : IdentityDbContext 
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options)
        {

        }
    }
}
