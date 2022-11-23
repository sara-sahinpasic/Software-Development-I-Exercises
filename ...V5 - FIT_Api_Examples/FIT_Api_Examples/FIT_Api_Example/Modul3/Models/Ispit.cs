using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT_Api_Example.Modul3.Models
{
    public class Ispit
    {
        [Key]
        public int ID { get; set; }
        public string Naziv { get; set; }
        [ForeignKey ("PredmetID")]
        public Predmet Predmet { get; set; }
        public int PredmetID { get; set; }
    }
}
