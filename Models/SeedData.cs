using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WarApp.Data;

namespace WarApp.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new WarAppContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<WarAppContext>>()))
            {
                if (context.User.Any())
                {
                    return;
                }

                context.User.AddRange(
                    new User
                    {
                        userName = "first_user",
                        gamesPlayed = 0,
                        gamesWon = 0,
                        gamesLost = 0,
                        totalMoves = 0,
                        timesWar = 0
                    },

                    new User
                    {
                        userName = "second_user",
                        gamesPlayed = 0,
                        gamesWon = 0,
                        gamesLost = 0,
                        totalMoves = 0,
                        timesWar = 0
                    }
                );
                context.SaveChanges();
                    
            }
        }
    }
}
