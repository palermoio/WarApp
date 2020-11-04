using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc;

namespace WarApp.Controllers
{
    public class UserController : Controller
    {
        public string Index()
        {
            return "This is the user controller.";
        }

        public string displayName(string name)
        {
            return $"The user's name is {name}.";
        }
    }
}
