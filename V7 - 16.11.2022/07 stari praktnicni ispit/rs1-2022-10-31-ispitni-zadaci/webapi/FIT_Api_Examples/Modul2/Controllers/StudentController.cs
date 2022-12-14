using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul0_Autentifikacija.Models;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul2.ViewModels;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIT_Api_Examples.Modul2.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public StudentController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }



        [HttpGet]
        public ActionResult<List<Student>> GetAll(string ime_prezime)
        {
            var data = _dbContext.Student
                .Include(s => s.opstina_rodjenja.drzava)
                .Where(x => ime_prezime == null || (x.ime + " " + x.prezime).StartsWith(ime_prezime) || (x.prezime + " " + x.ime).StartsWith(ime_prezime))
                .OrderByDescending(s => s.id)
                .AsQueryable();
            return data.Take(100).ToList();
        }

        [HttpPost]
        public ActionResult Snimi([FromBody] StudentSnimiVM x) //ova metoda radi i update i insert - frontend: dugme snimi()
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

            Student novi;
            if (x.id == 0)
            {
                novi = new Student();
                _dbContext.Add(novi);

            }
            else
            {
                novi = _dbContext.Student.Find(x.id);
            }

            //salju se samo atributi koji se nalaze na interface-u
            novi.opstina_rodjenja_id = x.opstina_rodjenja_id;
            novi.ime = x.ime;
            novi.prezime = x.prezime;

            _dbContext.SaveChanges();
            return Ok();
        }
    }


}
