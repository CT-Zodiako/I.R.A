import { Component , OnInit} from '@angular/core';
import { Nota, NotaAll } from '../nota';
import { Materia } from '../materia';
import { NotasService } from '../notas.service';
import { MateriasService } from '../materias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jarm-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  toggle = [false, true, true];

  seleccionado?: Nota;
  stBuscarMateria?: string;
  CREATE = 1;
  READ = 2;
  UPDATE = 3;
  DELETE = 4;
  optionCrud: number = this.CREATE;

  notas?: NotaAll[] = [];
  materias?: Materia[] = [];

  onChangeEvent(event: any) {
    if ( event.target.value !== "" ) {
      let stSearch = event.target.value 
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      this.notas = this.notas!.filter((_nota) => { 
        return (_nota.materia.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
          .includes(stSearch)) 
      });
      console.log(this.notas);
    } else {
      this.notas = [];
      this.obtenerNotas();
    }
  }

  seleccionar(item: Nota) {
    this.seleccionado = item;
  }

  constructor(
    private notasService: NotasService,
    private materiasService: MateriasService, router: Router)
   {
    router.events.subscribe(() => {
      if (router.url.split("/")[1] == "notas") {
        this.changeClass(0);
      } else if (router.url.split("/")[1] == "notas-editar") {
        this.changeClass(1);
      } else if (router.url.split("/")[1] == "materias") {
        this.changeClass(2);
      }
    });}


  // constructor(router: Router) {
  //   router.events.subscribe(() => {
  //     if (router.url.split("/")[1] == "notas") {
  //       this.changeClass(0);
  //     } else if (router.url.split("/")[1] == "notas-editar") {
  //       this.changeClass(1);
  //     } else if (router.url.split("/")[1] == "materias") {
  //       this.changeClass(2);
  //     }
  //   });
  // }



  obtenerNotas(): void {
    this.notasService.getAllNotas().subscribe((arResponse) => {
      let lasnotas:Nota[] = arResponse[0];
      this.materias = arResponse[1];

      lasnotas!.forEach((element) => {
        let mMateria = this.materias?.find((_materia) => {
          return _materia.id === element.materia_id;
        });
        
        this.notas?.push({
          id: element.id,
          materia_id: element.materia_id,
          materia: mMateria!.nombre,
          semestre: mMateria!.semestre,
          parcial_1: element.parcial_1,
          parcial_2: element.parcial_2,
          final: element.final,
          promedio:
            Math.round(
              ((element.parcial_1 + element.parcial_2 + element.final) / 3) *
                100
            ) / 100,
        });

      });
    });
  }


  borrar(nota: Nota): void {
    this.notas = this.notas!.filter((h) => h.id !== nota.id);
    this.notasService.borrarNota(nota.id).subscribe();
  }

  changeClass(selected: number) {
    for (const i in this.toggle) {
      if (this.toggle[i] === false) {
        this.toggle[i] = true;
      }
    }
    this.toggle[selected] = false;
  }





  ngOnInit(): void {
    this.obtenerNotas();
  }

}
