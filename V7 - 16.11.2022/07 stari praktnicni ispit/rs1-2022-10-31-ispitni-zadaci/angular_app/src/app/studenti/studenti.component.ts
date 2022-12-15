import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MojConfig } from '../moj-config';
import { Router } from '@angular/router';
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css'],
})
export class StudentiComponent implements OnInit {
  title: string = 'angularFIT2';
  ime_prezime: string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;

  odabranistudent: any;
  opstinaPodaci: any;
  //akademskaGodinaPodaci: any;
  naslovDialoga = 'Novi student'; //naslova pop-up modala

  constructor(private httpKlijent: HttpClient, private router: Router) {}

  fetchStudenti(): void {
    //download podataka
    this.httpKlijent
      .get(
        MojConfig.adresa_servera + '/Student/GetAll',
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.studentPodaci = x;
      });
  }
  fetchOpstine(): void {
    this.httpKlijent
      .get(
        MojConfig.adresa_servera + '/Opstina/GetByAll',
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.opstinaPodaci = x;
      });
  }
  /*fetchAkGodine(): void {
    this.httpKlijent
      .get(
        MojConfig.adresa_servera + '/AkademskeGodine/GetAll_ForCmb',
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.akademskaGodinaPodaci = x;
      });
  }*/

  ngOnInit(): void {
    this.fetchStudenti();
    this.fetchOpstine();
    //this.fetchAkGodine();
  }

  getPodaci() {
    return this.studentPodaci.filter(
      (s: any) =>
        (!this.filter_ime_prezime || //vraćanje svih podataka kada je checkbox iskljucen (ako je iskljucen [false] vrati sve podatke)
          (s.ime + ' ' + s.prezime)
            .toLowerCase()
            .startsWith(this.ime_prezime) ||
          (s.prezime + ' ' + s.ime)
            .toLowerCase()
            .startsWith(this.ime_prezime)) &&
        (!this.filter_opstina ||
          s.opstina_rodjenja.description.toLowerCase().startsWith(this.opstina))
    );
  }

  noviStudentDugme() {
    this.naslovDialoga = 'Novi student';
    //napraviti novi objekat s
    this.odabranistudent = {
      //setovanje [da bi se mogla iskodirati funkcija snimi - koja radi i update i insert]:
      id: 0,
      //ime: '...',
      ime: this.ime_prezime, //ovako se upisana vrijdnost unutar textBoxa, prilikom klika na dugme novi student automatski upisuje
      prezime: '...',
      opstina_rodjenja_id: 2,
    };
  }

  snimidugme() {
    //odabrani_studnet saljemo (metoda subscribe sa lambdom) na server -  (post metoda)
    this.httpKlijent
      .post(
        MojConfig.adresa_servera + '/Student/Snimi',
        this.odabranistudent,
        MojConfig.http_opcije()
      )
      .subscribe((s: any) => {
        //nakon download (snimanja) "s" je rezultat toga
        this.fetchStudenti(); //nakon preuzimanja da se refresh-uju podaci u tabeli
        this.odabranistudent = null; //zatvaranje dijaloga
      });
  }
  urediDugme(s: any) {
    this.naslovDialoga = 'Uredi student';
    this.odabranistudent = s;
  }
  obrisiDugme1(s: any) {
    this.httpKlijent
      .post(
        MojConfig.adresa_servera + '/Student/Obrisi1',
        s,
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.fetchStudenti();
      });
  }

  obrisiDugme2(s: any) {
    this.httpKlijent
      .post(
        MojConfig.adresa_servera + '/Student/Obrisi2?studentid=' + s.id,
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.fetchStudenti();
      });
  }

  maticnaKnjigaDugme(s:any) {
    this.router.navigate(["/student-maticnaknjiga", s.id]);
  }
}
