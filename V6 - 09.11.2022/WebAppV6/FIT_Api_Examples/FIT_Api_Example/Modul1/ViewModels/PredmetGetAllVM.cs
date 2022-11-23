using FIT_Api_Example.Modul1.Models;

namespace FIT_Api_Example.Modul1.ViewModels
{
    public class PredmetGetAllVM
    {

        public int id { get; set; }
        public string naziv { get; set; }
        public string ects { get; set; }
        public string sifra { get; set; }
        public double? ProsjecnaOcjena { get; set; }
    }
}
