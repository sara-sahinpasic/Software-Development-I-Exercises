using FIT_Api_Example.Modul2.Models;
using System.ComponentModel.DataAnnotations;

namespace FIT_Api_Example.Modul1.Models
{
    public class Predmet
    {
        [Key]
        public int ID { get; set; }
        public string Naziv { get; set; }   
        public string Sifra { get; set; }   
        public int Ects { get; set; }

        public List<Ocjena> Ocjene{ get; set; } //ovo nije nova kolona u db tabeli, nego pomocni atribut koji ce nam olaksati 
        //pristup svim ocjenama za predmet
    }
}
