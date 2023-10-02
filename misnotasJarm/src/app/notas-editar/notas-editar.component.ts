import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import { NotasService } from '../notas.service';
import { MateriasService } from '../materias.service';
import { Nota, NotaAll } from '../nota';
import { Materia } from '../materia';
@Component({
  selector: 'jarm-notas-editar',
  templateUrl: './notas-editar.component.html',
  styleUrls: ['./notas-editar.component.css']
})
export class NotasEditarComponent implements OnInit {

  @Input() selectedNota?: NotaAll;

  CREATE = 1;
  READ = 2;
  UPDATE = 3;
  DELETE = 4;
  optionCrud: number = this.UPDATE;

  notas: NotaAll[] = [];
  materias: Materia[] = [];


  materia_select: number = -1;


  mPromedio?:number;

  arValidaInput = [true, true, true];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private materiasService: MateriasService,
    private location: Location
  ) {
    this.route = route;
    let t = this.route.snapshot.paramMap.get('id');
    let tIsNull = (t == "" || t == null || t == undefined )? "-1" : t;
    let idNota = (t !== "" && parseInt(tIsNull) > -1) ? Number(t) : null;
    if (idNota!){
      this.optionCrud = this.UPDATE;
    }else{
      this.optionCrud = this.CREATE;
    }
  }


  btnMateriaURL(evento: any) {
    let id_materia = parseInt(evento.target.value);
    let xNota = this.notas.find((_nota) => { return _nota.materia_id == id_materia });
    if(xNota!){
      this.router
      .navigateByUrl('notas-editar', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['notas-editar/' + xNota!.id]);
      });
      this.optionCrud = this.UPDATE;
    }else{
      //cargar materia sin notas (CREATE)
      let stMateria = this.materias.find((e) => { return e.id == id_materia});
      this.optionCrud = this.CREATE;
      this.selectedNota = { id: -1, materia_id: id_materia, materia: stMateria!.nombre, semestre: stMateria!.semestre, 
        parcial_1: -1, parcial_2: -1, final: -1, promedio: -1,
      }
    }
  }

  getNotaUrl(): void {
    
    let t = this.route.snapshot.paramMap.get('id');
    let tIsNull = (t == "" || t == null || t == undefined )? "-1" : t;
    let idNota = (t !== "" && parseInt(tIsNull) > -1) ? Number(t) : null;


    this.notasService.getAllNotas().subscribe((arResponse) => {
        let lasnotas:Nota[] = arResponse[0];
        this.materias = arResponse[1];
        
        //insertar materia y semestre de lista materias en lista notas
        lasnotas!.forEach((_nota) => {
          
          if(idNota !== null){}else{idNota = _nota.id} //si no hay id en url seleccionar la primera nota

          let mMateria = this.materias?.find((_materia) => {
            return _materia.id == _nota.materia_id;
          });

          if(mMateria!){
            this.notas.push(Object.assign(_nota, {
              materia: mMateria!.nombre,
              semestre: mMateria!.semestre,
              promedio: Math.round(((_nota.parcial_1 + _nota.parcial_2 + _nota.final) / 3) * 100) / 100, 
            }) )
          }
          
        });
        this.selectedNota = this.notas.find((e) => {return e.id == idNota})
        this.optionCrud = this.UPDATE;
      
    });
  } ngOnInit(): void {
    this.getNotaUrl();
  }


  parcialUno(valueString: any) {
    let value: number = parseInt(valueString.target.value);
    this.selectedNota!.promedio = Math.round(((value + this.selectedNota!.parcial_2 + this.selectedNota!.final)  / 3) * 100) / 100;
  }
  parcialDos(valueString: any) {
    let value: number = parseInt(valueString.target.value);
    this.selectedNota!.promedio = Math.round(((this.selectedNota!.parcial_1 + value + this.selectedNota!.final)  / 3) * 100) / 100;
  }
  parcialFinal(valueString: any) {
    let value: number = parseInt(valueString.target.value);
    this.selectedNota!.promedio = Math.round(((this.selectedNota!.parcial_2 + this.selectedNota!.parcial_2 + value)  / 3) * 100) / 100;
  }

  nuevo(nota: Nota, _optionCrud: number): void {

    if (nota.parcial_1 !== -1 && nota.parcial_2 !== -1 && nota.final !== -1
        && nota.parcial_1 !== null && nota.parcial_2 !== null && nota.final !== null
      ) { 
      if (_optionCrud === this.CREATE) { 
        //Traer el ultimo id
        nota.id = (this.notas?.length) ? (this.notas[this.notas?.length-1].id+1) : 0;
        //enviar formulario
        console.log("object", nota.id);
        this.notasService.crearNuevo(nota as Nota).subscribe(); 
        
      } else if (_optionCrud === this.UPDATE) {
        this.notasService.actualizar(nota as Nota).subscribe(); 
      }
      alert("Guardado")
    }else {
      this.arValidaInput[0] = nota.parcial_1 !== -1 && nota.parcial_1 !== null ? true: false;
      this.arValidaInput[1] = nota.parcial_2 !== -1 && nota.parcial_2 !== null ? true: false;
      this.arValidaInput[2] = nota.final !== -1 && nota.final !== null ? true: false;
      console.log("this.arValidaInput[0]: ",  nota.parcial_1);
      console.log("this.arValidaInput[1]: ",  nota.parcial_2);
      console.log("this.arValidaInput[2]: ",  nota.final);
      alert("Revisar formularios con cuidado")
    }
  }

  borrar(nota: Nota): void {
    this.notas = this.notas!.filter((h) => h.id !== nota.id);
    this.notasService.borrarNota(nota.id).subscribe();
    this.selectedNota = this.notas[0]
  }

  regresar(): void {
    this.location.back();
  }

}
