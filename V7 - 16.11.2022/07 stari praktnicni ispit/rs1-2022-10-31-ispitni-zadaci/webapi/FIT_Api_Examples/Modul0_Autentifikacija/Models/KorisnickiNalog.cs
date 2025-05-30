﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json.Serialization;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;

namespace FIT_Api_Examples.Modul0_Autentifikacija.Models
{
    [Table("KorisnickiNalog")]
    public class KorisnickiNalog
    {
        [Key]
        public int id { get; set; }
        public string korisnickoIme { get; set; }
        [JsonIgnore]
        public string lozinka { get; set; }
        public string slika_korisnika { get; set; }

        [JsonIgnore]
        public Student student => this as Student; //funkcija -> C++ dynamic asis, C# save cast

        [JsonIgnore]
        public Nastavnik nastavnik => this as Nastavnik;
        public bool isNastavnik => nastavnik != null;
        public bool isStudent => student != null;
        public bool isAdmin { get; set; } //role koje nemaju svoje tabele
        public bool isProdekan { get; set; } //role koje nemaju svoje tabele
        public bool isDekan { get; set; } //role koje nemaju svoje tabele
        public bool isStudentskaSluzba { get; set; } //role koje nemaju svoje tabele
        
 
    }
}
