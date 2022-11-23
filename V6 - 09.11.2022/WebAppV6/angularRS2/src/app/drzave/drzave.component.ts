import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-drzave',
  templateUrl: './drzave.component.html',
  styleUrls: ['./drzave.component.css']
})
export class DrzaveComponent implements OnInit {

  constructor(private httpKlijent:HttpClient) { }

  ngOnInit(): void {
    this.preuzmiPodatke();
  }
podaci:any;
  //filer_drzava: any;
  filer_drzava= "";
  odabrana_drzava: any;



  preuzmiPodatke() {
    this.httpKlijent.get(MojConfig.adresa_servera+"/Drzava/GetAll")
      .subscribe(((x:any)=>{
      this.podaci=x;
    }));
  }


  getPodaci() {
    if(this.podaci==null)
      return [];
    return this.podaci.filter((x:any)=>x.opis.toLowerCase()
      .startsWith(this.filer_drzava.toLowerCase()));
  }

  spremi() {
    this.httpKlijent.post(MojConfig.adresa_servera+"/Drzava/Snimi", this.odabrana_drzava)
      .subscribe(((x:any)=>{
        this.preuzmiPodatke();
        this.novaDrzava();
      }))
  }

  novaDrzava() {
    this.odabrana_drzava={
      id:0,
      opis:'',
      skracenica:''
    }
  }
}
