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
        /*public class StudentObrisiVM
        {
            public int Opis { get; set; }
        }*/

        [HttpPost]
        public ActionResult Obrisi1([FromBody] /*Student*/StudentGetAllVM x)
        {
            Student obj = _dbContext.Student.Find(x.id);
            _dbContext.Remove(obj);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public ActionResult Obrisi2(int studentid)
        {
            Student x = _dbContext.Student.Find(studentid);
            _dbContext.Remove(x);
            _dbContext.SaveChanges();
            return Ok();
        }


        //[HttpGet]
        //public ActionResult<List<Student>> GetAll(string ime_prezime)
        //{
        //    if (!HttpContext.GetLoginInfo().isLogiran)
        //        return BadRequest("nije logiran");

        //    var data = _dbContext.Student
        //        .Include(s => s.opstina_rodjenja.drzava)
        //        .Where(x => ime_prezime == null || (x.ime + " " + x.prezime).StartsWith(ime_prezime) || (x.prezime + " " + x.ime).StartsWith(ime_prezime))
        //        .OrderByDescending(s => s.id)
        //        .AsQueryable();
        //    return data.Take(100).ToList();
        //}
        [HttpGet]
        public ActionResult<List<StudentGetAllVM>> GetAll(string ime_prezime)
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

            var data = _dbContext.Student
                //.Include(s => s.opstina_rodjenja.drzava)
                .Where(x => ime_prezime == null || (x.ime + " " + x.prezime).StartsWith(ime_prezime) || (x.prezime + " " + x.ime).StartsWith(ime_prezime))
                .OrderByDescending(s => s.id)
                //.AsQueryable()
                .Select(s => new StudentGetAllVM //Snimi()
                {
                    ime = s.ime,
                    id = s.id,
                    prezime = s.prezime,
                    opstina_rodjenja_id = s.opstina_rodjenja_id,
                    opstina_rodjenja_opis = s.opstina_rodjenja.description + " " + s.opstina_rodjenja.drzava.naziv,
                    prosjecnaOcjena = 0,//ToDo
                    brojPolozenihPredmeta = 0,//ToDo
                    datumDodavanja = s.created_time.ToString("d")
                    //datumRodjenja ToDO
                    //brojIndeksa ToDO

                }); ;
            return data.Take(100).ToList();
        }

        //[HttpPost]
        //public ActionResult Snimi([FromBody] StudentSnimiVM x) //ova metoda radi i update i insert - frontend: dugme snimi()
        //{
        //    if (!HttpContext.GetLoginInfo().isLogiran)
        //        return BadRequest("nije logiran");

        //    Student novi;
        //    if (x.id == 0)
        //    {
        //        novi = new Student();
        //        _dbContext.Add(novi);
        //    }
        //    else
        //    {
        //        novi = _dbContext.Student.Find(x.id);
        //    }

        //    //salju se samo atributi koji se nalaze na interface-u
        //    novi.opstina_rodjenja_id = x.opstina_rodjenja_id;
        //    novi.ime = x.ime;
        //    novi.prezime = x.prezime;

        //    _dbContext.SaveChanges();
        //    return Ok();
        //}
        [HttpPost]
        public ActionResult Snimi([FromBody] /*Student*/StudentGetAllVM x) //ova metoda radi i update i insert - frontend: dugme snimi()
        {
            Student obj;
            if (x.id == 0)
            {
                obj = new Student();
                _dbContext.Add(obj);
            }
            else
            {
                obj = _dbContext.Student.Find(x.id);
                if (obj == null)
                {
                    return BadRequest("id neispravan");
                }
            }

            obj.prezime = x.prezime;
            obj.ime = x.ime;
            obj.opstina_rodjenja_id = x.opstina_rodjenja_id;

            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
