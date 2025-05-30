import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import { Proba1Component } from './proba1/proba1.component';
import { StudentiComponent } from './studenti/studenti.component';
import { DrzaveComponent } from './drzave/drzave.component';
import { OpstineComponent } from './opstine/opstine.component';
import { PredmetiComponent } from './predmeti/predmeti.component';
import { Proba2Component } from './proba2/proba2.component';

@NgModule({
  declarations: [
    AppComponent,
    Proba1Component,
    StudentiComponent,
    DrzaveComponent,
    OpstineComponent,
    PredmetiComponent,
    Proba2Component
  ],
    imports: [
        BrowserModule,
      RouterModule.forRoot([
        {path: 'putanja-studenti', component: StudentiComponent},
        {path: 'putanja-proba1', component: Proba1Component},
        {path: 'putanja-opstine', component: OpstineComponent},
        {path: 'putanja-drzave', component: DrzaveComponent},
        {path: 'putanja-predmeti', component: PredmetiComponent},
      ]),
        FormsModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
