using FIT_Api_Example.Modul2.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.NetworkInformation;

namespace FIT_Api_Example.Modul3.Models
{
    public class Ocjena
    {
        [Key]
        public int ID { get; set; }
        public DateTime Datum { get; set; }
        [ForeignKey("StudentID")]
        public Student  Student{ get; set; }
        public int StudentID { get; set; }

        [ForeignKey ("PredmetID")]
        public Predmet Predmet { get; set; }
        public int PredmetID { get; set; }

    }
}
