using FIT_Api_Examples.Modul0_Autentifikacija.Models;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT_Api_Examples.Modul2.Models
{
    [Table("UpisAkGodine")]
    public class UpisAkGodine
    { 
        [Key]
        public int id { get; set; }
        public DateTime datumUpisZimski { get; set; }
        public int godinaStudija { get; set; }
        public double cijenaSkolarine { get; set; }
        public bool jeLiObnova { get; set; }

        [ForeignKey(nameof(akademskaGodina))]
        public int akademskaGodina_id { get; set; }
        public AkademskaGodina akademskaGodina { get; set; }

        [ForeignKey(nameof(student))]
        public int student_id { get; set; }
        public Student student{ get; set; }
        public DateTime? datumOvjeraZimki { get; set; }

        [ForeignKey(nameof(evidnetiraoKorisnik))]
        public int evidentiraoKorisnikID { get; set; }
        public KorisnickiNalog evidnetiraoKorisnik{ get; set; }
    }
}
