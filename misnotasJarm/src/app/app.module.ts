import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MateriasComponent } from './materias/materias.component';
import { MensajesComponent } from './mensajes/mensajes.component';

import { NotasComponent } from './notas/notas.component';
import { NotasEditarComponent } from './notas-editar/notas-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    MateriasComponent,
    MensajesComponent,
  
    NotasComponent,
    NotasEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
