import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MojConfig } from '../moj-config';
import { HttpClient } from '@angular/common/http';

declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css'],
})
export class StudentMaticnaknjigaComponent implements OnInit {
  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {}

  studentid: number;
  maticnaKnjigaPodaci: any;

  ovjeriLjetni(s: any) {}

  upisLjetni(s: any) {}

  ovjeriZimski(s: any) {}

  ngOnInit(): void {
    this.route.params.subscribe((s) => {
      this.studentid = +s['studentidparametar'];
      this.fetchMaticnaKnjigaDetalji();
    });
  }
  fetchMaticnaKnjigaDetalji() {
    this.httpKlijent
      .get(
        MojConfig.adresa_servera +
          '/MaticnaKnjigaDetalji/GetByID?studentid=' +
          this.studentid,
        MojConfig.http_opcije()
      )
      .subscribe((x) => {
        this.maticnaKnjigaPodaci = x;
      });
  }
}
