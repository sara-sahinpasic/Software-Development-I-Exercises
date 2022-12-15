using System;

namespace FIT_Api_Examples.Modul2.ViewModels
{
    public class StudentGetAllVM
    {
        public int id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public int? opstina_rodjenja_id { get; set; }
        public string opstina_rodjenja_opis { get; set; }
        public double prosjecnaOcjena { get; set; }
        public int brojPolozenihPredmeta { get; set; }
        public string datumDodavanja { get; set; }
        public int brojIndeksa { get; set; }
    }
}