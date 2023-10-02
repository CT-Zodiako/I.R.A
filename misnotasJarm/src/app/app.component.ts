import { Component, HostBinding } from '@angular/core';
import { MensajeService } from './mensaje.service';

@Component({
  selector: 'jarm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'misnotas';
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private mensajeService:MensajeService){}

  ngOnInit() {
    this.mensajeService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      this.isOpen = true;
      setTimeout(() => {
        this.isOpen = false;
      }, 1500);
    });
  }
}
