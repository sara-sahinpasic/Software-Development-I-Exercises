// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {MojConfig} from "./moj-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Vjezbe 5';
  ime: string="Sara";
  brojac:number=0;

  niz:string[]=['jedan', 'dva', 'tri', 'cetiri'];

  //student_podaci:any=[];
  student_podaci:any=[];

  filter_ime: any="";

  odabrani_student:any;

  constructor(private httpKlijent:HttpClient) {

  }

  ngOnInit(): void {
        //throw new Error('Method not implemented.');
  this.PreuzmiAngular();
  }


  testirajString() {
    this.ime+=" "+this.brojac++;

  }

  testirajInterval() {
    setInterval(()=>{
      this.brojac++;
    },1000)
  }

  jeLiVidljivo() {
return this.ime.length>3;
  }

  stilZaIme() {
          if(this.ime.startsWith('S'))
        return {color:'pink', border:'2px solid pink'};
      else
        return {'color':'red', 'border':'2px solid red'};
      }

  PreuzmiFetch() {
    fetch(MojConfig.adresa_servera+"/Student/GetAll")
      .then(
        r => {
          if (r.status !== 200) {
            alert("Server javlja grešku: " + r.status);
            return;
          }

          r.json().then(x => {
            // @ts-ignore
            this.student_podaci=x;
          });
        })
      .catch(
        err => {
          alert("Greška u komunikaciji sa serverom: " + err);
        });
  }

  PreuzmiAngular() {
    this.httpKlijent.get(MojConfig.adresa_servera+"/Student/GetAll").subscribe(x=>{
        this.student_podaci=x;
    });
  }


  getPodaci() {
    /*if(this.student_podaci=null)
      return []; - ovo treba, ali kod mene ne radis*/
    return  this.student_podaci.filter((x:any)=>x.ime.toLowerCase().startsWith(this.filter_ime));
  }

  snimi() {
    this.httpKlijent.post(MojConfig.adresa_servera+"/Student/Snimi/",this.odabrani_student).subscribe(x=>{
      //this.student_podaci=x;
    });
  }
}

