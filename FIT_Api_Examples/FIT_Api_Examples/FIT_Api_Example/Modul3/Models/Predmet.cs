using System.ComponentModel.DataAnnotations;

namespace FIT_Api_Example.Modul3.Models
{
    public class Predmet
    {
        [Key]
        public int ID { get; set; }
        public string Naziv { get; set; }
        public int Sifra { get; set; }
        public int ECTS { get; set; }
    }
}
