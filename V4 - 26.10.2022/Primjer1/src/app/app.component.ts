import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularRS1';

  ime:string="Razvoj";

  dugme2() {
    alert('Hello!');

    let a=5;
    let b:number=5;
  }

  f1():string{
    return "aa";
  }


  f2($event: MouseEvent) {

  }
podaci:any;


  odabraniPredmet:any;


  Preuzmi() {
   let url="https://localhost:7174/Predmet/GetAll?f=" + this.ime
    fetch(url)
      .then(
        r => {
          if (r.status !== 200) {
            alert("Server javlja grešku: " + r.status);
            return;
          }

          r.json().then(t => {

            this.podaci=t;
          });
        })
      .catch(
        err => {
          alert("Greška u komunikaciji sa serverom: " + err);
        });
  }


  f3() {
    this.ime+="-a";
  }
}
