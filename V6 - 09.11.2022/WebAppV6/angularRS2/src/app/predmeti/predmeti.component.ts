import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {
  podaci: any;
  odabrani_predmet: any;

  filter_ime="";

  getPodaci(){
     if(this.podaci==null) //ako je var==null (jos nije download-ovana)
        return []; //vratiti cemo prazan niz
     return this.podaci.filter((x:any)=>x.naziv.toLowerCase()
       .startsWith(this.filter_ime.toLowerCase()));
   }
  constructor(private httpKlijent:HttpClient) { } //1. inicijaliziranje objekta za get-anje podataka

  ngOnInit(): void {
    //preuzmiPodatke()
    this.httpKlijent.get(MojConfig.adresa_servera+"/Predmet/GetAll").subscribe(((x:any)=>{ //2. fetch podataka na  putanji (koja se poziva) preko subscribe
      this.podaci=x; //3. kad se dobiju podaci = x; te ih je ona otrebno prikazati u html
    }))
  }

  private preuzmiPodatke(){
    this.httpKlijent.get(MojConfig.adresa_servera+
      "/Predmet/GetAll").subscribe(((x:any)=>{
      this.podaci=x;
    }))
  }
  snimi() {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Predmet/Snimi", this.odabrani_predmet).subscribe(((x:any)=>{
        this.preuzmiPodatke();
        this.novi_predmet(); //nakon snimanja podataka da se isprazni textBox
    }));
  }

  novi_predmet() {
    this.odabrani_predmet={
      id:0,
      naziv:'',
      ects:5,
      skracenica:''
    }
  }
}
