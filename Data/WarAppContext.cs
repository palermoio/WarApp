using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarApp.Models;
using Microsoft.EntityFrameworkCore;

namespace WarApp.Data
{
    public class WarAppContext : DbContext
    {
        public WarAppContext (DbContextOptions<WarAppContext> options)
            : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Game> Game { get; set; }
    }
}
