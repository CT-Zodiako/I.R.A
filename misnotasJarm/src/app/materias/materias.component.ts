import { Component, OnInit, Input } from '@angular/core';
import { MateriasService } from '../materias.service';
import {Materia} from "../materia"
import { Router } from '@angular/router';
@Component({
  selector: 'jarm-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  toggle = [false, true, true];
  @Input() seleccionado: Materia = { id: 0, nombre: '', semestre: 0 };

  CREATE = 1;
  READ = 2;
  UPDATE = 3;
  DELETE = 4;
  optionCrud: number = this.CREATE;
  materias?: Materia[];

  arValidaInput = [true, true, true];


  seleccionar(item: Materia) {
    this.seleccionado = item;
  }
  constructor(private materiasService: MateriasService,router: Router) {
    router.events.subscribe(() => {
      if (router.url.split("/")[1] == "materias") {
        this.changeClass(0);
      } else if (router.url.split("/")[1] == "notas") {
        this.changeClass(1);
      } else if (router.url.split("/")[1] == "notas") {
        this.changeClass(2);
      }
    });
  }

  obtenerMaterias(): void {
    this.materiasService
      .getMaterias()
      .subscribe((lasmaterias) => (this.materias = lasmaterias));
  }

  nuevo(materia: Materia, _optionCrud: number): void {
    materia.nombre = materia.nombre.trim();
    if (materia.nombre !== "" && materia.semestre! && materia.semestre > -1
        && materia.semestre < 13
      ) { 
      if (_optionCrud === this.CREATE) { 
        materia.id = (this.materias?.length) ? (this.materias[this.materias?.length-1].id+1) : 0;
        
        this.materiasService.crearNuevo(materia as Materia).subscribe((_materia) => {
          this.materias!.push(_materia);
        }); 
        this.seleccionado = { id: 0, nombre: '', semestre: 0 };
        
      } else if (_optionCrud === this.UPDATE) {
        this.materiasService.actualizar(materia as Materia).subscribe(); 
        this.optionCrud = this.CREATE;  
        this.seleccionado = { id: 0, nombre: '', semestre: 0 };
      }
    }else{
      this.arValidaInput[0] = (materia.nombre !== "" && materia.nombre !== null) ? true: false;
      this.arValidaInput[1] = (materia.semestre !== null && materia.semestre > 0 && materia.semestre < 13) ? true: false;
      console.log("---", this.arValidaInput[0]+"--"+this.arValidaInput[1]);
        alert("Revisar formularios con cuidado")
    }
  }

  optionNuevo(){
    this.optionCrud = this.CREATE;
    this.seleccionado = { id: 0, nombre: '', semestre: 0 };
  }

  borrar(materia: Materia): void {
    this.materias = this.materias!.filter((h) => h.id !== materia.id);
    this.materiasService.borrarMateria(materia.id).subscribe();
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
    this.obtenerMaterias();
  }
}
