import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  mensajes: string[] = [];
  isOpen = true;

  agregar(mensaje: string){
    this.mensajes.push(mensaje);
    this.toggle();
  }

  limpiar(){
    this.mensajes = [];
    this.toggle();
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
  

  constructor() { }

 
}
