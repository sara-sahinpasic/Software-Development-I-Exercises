using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul2.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.Controllers___Copy
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class MaticnaKnjigaContollerContoller : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MaticnaKnjigaContollerContoller(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public class MaticnaKnjigaDetaljiUpisiVM
        {
            public DateTime? zimskiSmestarOvjera;
            public DateTime zimskiSemestar;
            public bool obnova;
            public int godinaStudija;
            public string akaemskaGodinaOpis;
            public int upisAkgodineID;
            public string evidanetiraoKorisnik;
        }
        public class MaticnaKnjigaDetaljiVM
        {
            public int studentid { get; set; }
            public string ime { get; set; }
            public string prezime { get; set; }

            public List<MaticnaKnjigaDetaljiUpisiVM> akGodines { get; set; }
            
        }
        [HttpGet]
        public ActionResult<MaticnaKnjigaDetaljiVM> GetByID(int studentid)
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

           var objStudent= _dbContext.Student.Find(studentid);

            var resultvm = new MaticnaKnjigaDetaljiVM
            {
                studentid=objStudent.id,
                prezime=objStudent.prezime,
                ime=objStudent.ime,
                akGodines = _dbContext.UpisAkGodine.Where(s=>s.student_id==studentid)
                .Select(upakg=>new MaticnaKnjigaDetaljiUpisiVM
                {
                    upisAkgodineID=upakg.id,
                    akaemskaGodinaOpis=upakg.akademskaGodina.opis,
                    godinaStudija=upakg.godinaStudija,
                    obnova=upakg.jeLiObnova,
                    zimskiSemestar=upakg.datumUpisZimski,
                    zimskiSmestarOvjera=upakg.datumOvjeraZimki,
                    evidanetiraoKorisnik=upakg.evidnetiraoKorisnik.korisnickoIme
                    //npr prosjecnaOcjena, Dug, PoloyeniIspiti
                })
                .ToList(),
                //npr polozeniPredmeti
                //npr uplate
            };

            return resultvm;
        }
    }
}
