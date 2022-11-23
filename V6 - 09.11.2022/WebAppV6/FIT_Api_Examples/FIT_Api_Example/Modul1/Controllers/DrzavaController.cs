using FIT_Api_Example.Data;
using FIT_Api_Example.Helper;
using FIT_Api_Example.Modul1.ViewModels;
using FIT_Api_Example.Modul2.Models;
using Microsoft.AspNetCore.Mvc;

namespace FIT_Api_Example.Modul2.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class DrzavaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public DrzavaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


        [HttpPost]
        public Drzava Snimi([FromBody] DrzavaAddVM x) //radi i update i insert
        {
            Drzava? objekat;

            if (x.id == 0) // ako je id == 0 - kreiramo novu drzavu:
            {
                objekat = new Drzava(); //ide INSERT u bazu podataka
                _dbContext.Add(objekat);//priprema sql //ide INSERT u bazu podataka
            }
            else // različitno od nule
            {
                objekat = _dbContext.Drzava.Find(x.id); //trazi se objekat u bazi podataka
            }

            objekat.naziv = x.opis; //ovdje se mijenjaju atributi objekta
            objekat.skrecenica = x.skracenica; //ovdje se mijenjaju atributi objekta

            _dbContext.SaveChanges(); //exceute sql -- update Predmet set ... where... //UPDATE u database-u
            return objekat;
        }

        [HttpGet]
        //povratni tip podataka je:
        public ActionResult GetAll() // ovaj model za "getanje" mora odgovarati Viewmodelu Drzava sa atributima
        {
            var data = _dbContext.Drzava
                .OrderBy(s => s.naziv)
                
                // moze ovako ili se moze napraviti klasa za GetAllVM
                 //.Select(s => new
                 //{
                 //    id = s.id,
                 //    opis = s.naziv,
                 //    skrecenica = s.skrecenica,
                 //})

                 .Select(s => new DrzavaGetAllVM
                 {
                     id = s.id,
                     opis = s.naziv,
                     skracenica = s.skrecenica,
                 })

            //.AsQueryable();
            //return Ok(data.Take(100).ToList());
            .Take(100);
            return Ok(data.ToList());
            /*
             Ovdje je zanimljivo sta je povratni tip podatka - opcije koje NE prolaze;
            public ActionResult GetAll()
            public List<CmbStavke> GetAll()
             public List<object> GetAll(), ali prolazi
            public ActionResult GetAll() - tako da se povratna vrijednost protvori u odg tip podatka sa fja OK()
             */
        }
    }
}
