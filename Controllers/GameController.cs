using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Protocols;
using WarApp.Data;
using WarApp.Models;

namespace WarApp.Controllers
{
    public class GameController : Controller
    {

        private WarAppContext db;

        public GameController(WarAppContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
           
            return View();
        }
    }
}
