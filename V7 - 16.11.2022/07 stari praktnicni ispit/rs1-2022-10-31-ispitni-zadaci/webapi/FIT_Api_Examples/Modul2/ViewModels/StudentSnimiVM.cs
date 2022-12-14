namespace FIT_Api_Examples.Modul2.ViewModels
{
   public class StudentSnimiVM
    {
        public int? opstina_rodjenja_id { get;  set; }
        public string prezime { get;  set; }
        public string ime { get;  set; }
        public int id { get;  set; }
    }
    /* 
     * ovaj INTERNAL je velika greska, zbog njega mi nije update zapise nego je sve vrijeme kreirao nove prazne zapise
     * public class StudentSnimiVM
     {
         public string ime { get; internal set; }
         public int id { get; internal set; }
         public string prezime { get; internal set; }
         public int? opstina_rodjenja_id { get; internal set; }
     }*/
}
