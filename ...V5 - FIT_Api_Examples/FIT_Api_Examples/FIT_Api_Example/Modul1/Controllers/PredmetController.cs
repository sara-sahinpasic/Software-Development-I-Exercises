using FIT_Api_Example.Data;
using FIT_Api_Example.Helper;
using FIT_Api_Example.Modul1.Models;
using FIT_Api_Example.Modul1.ViewModels;
using FIT_Api_Example.Modul2.Models;
using Microsoft.AspNetCore.Mvc;

namespace FIT_Api_Example.Modul2.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class PredmetController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public PredmetController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        /*public class PredmetAddVM
        {
            public string sifraPredmeta { get; set; }
            public string nazivPredmeta { get; set; }
            public int ectsBodov { get; set; }
        }
       

        [HttpPost]
        public Predmet Add([FromBody] PredmetAddVM x)
        {
            var noviZapis = new Predmet
            {
                Naziv = x.nazivPredmeta,
                Sifra = x.sifraPredmeta,
                Ects = x.ectsBodov,
            };

            _dbContext.Add(noviZapis);//priprema sql
            _dbContext.SaveChanges();//exceute sql -- insert into Predmet
            return noviZapis;
        }*/

        public class PredmetSnimiVM
        {
            public int ID { get; set; }
            public string sifraPredmeta { get; set; }
            public string nazivPredmeta { get; set; }
            public int ectsBodov { get; set; }
        }
        [HttpPost]
        public Predmet Snimi([FromBody] PredmetSnimiVM x)
        {
            Predmet? objekat;

            //objekat = x.ID == 0 ? new Predmet() : _dbContext.Predmet.Find(x.ID);
            if (x.ID == 0)
            {
                objekat = new Predmet();
                _dbContext.Add(objekat);
            }
            else
            {
                objekat = _dbContext.Predmet.Find(x.ID);
            }

                objekat.Naziv = x.nazivPredmeta;
                objekat.Sifra = x.sifraPredmeta;
                objekat.Ects = x.ectsBodov;
            _dbContext.SaveChanges();//exceute sql -- update Predmet set... where...
            return objekat;
        }






        [HttpGet]
        public List<PredmetGetAllVM> GetAll(string? f, float min_prosjecna_ocjena)
        {
            var pripremaUpita = _dbContext.Predmet
                .Where(p => (f == null || p.Naziv.ToLower().StartsWith(f.ToLower())) //filter po nazivu
                &&
               ((_dbContext.Ocjena.Where(o=>o.PredmetID==p.ID).Average(p=>(int?)p.BrojcanaOcjena)??0)<= min_prosjecna_ocjena)
                )//filter po prosjecnoj ocjeni
                 /*((p.Ocjene.Average(x => (int?)x.BrojcanaOcjena) ?? 0) < min_prosjecna_ocjena))*/
                .OrderBy(p => p.Naziv)
                .ThenBy(p => p.Sifra)
                .Take(100)
                .Select(p => new PredmetGetAllVM
                {
                    ECTS = p.Ects.ToString(),
                    Naziv = p.Naziv,
                    ProsjecnaOcjena = 0
                })
                ;


            return pripremaUpita
                .ToList(); //exceute sql -- select top 100 * from Predmet where naziv like 'A%' order by naziv, sifra
        }
    }
}
