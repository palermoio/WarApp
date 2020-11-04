using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using WarApp.Data;
using WarApp.Models;

namespace WarApp.Controllers
{
    public class DashboardController : Controller
    {
        private WarAppContext db;

        public DashboardController(WarAppContext db)
        {
            this.db = db;
        }
        public IActionResult Index(int? user_id)
        {
            User user = db.User.Find(user_id);
            return View(user);
        }
    }
}
