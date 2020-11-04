using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarApp.Models
{
    public class Game
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int numMoves { get; set; }
        public int timesWar { get; set; }
        public bool gameOver { get; set; }
        public bool savedGame { get; set; }
        public string saveState { get; set; }
    }
}
