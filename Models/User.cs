using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarApp.Models
{
    public class User
    {
        public int id { get; set; }
        public string userName { get; set; }
        public int gamesPlayed { get; set; }
        public int gamesWon { get; set; }
        public int gamesLost { get; set; }
        public int totalMoves { get; set; }
        public int timesWar { get; set; }
    }
}
