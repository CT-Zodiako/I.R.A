import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Nota } from './nota';
import { Materia } from './materia';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const notas = [
      { id: 1, materia_id: 11, parcial_1: 5, parcial_2: 5, final: 1 },
      { id: 2, materia_id: 21, parcial_1: 3.3, parcial_2: 4.1, final: 1.5 },
      { id: 3, materia_id: 41, parcial_1: 4.5, parcial_2: 4.0, final: 2.7 },
      { id: 4, materia_id: 31, parcial_1: 4.4, parcial_2: 4.1, final: 3.6 },
      { id: 5, materia_id: 10, parcial_1: 4.2, parcial_2: 3.2, final: 4.8 },
      { id: 6, materia_id: 6, parcial_1: 3.2, parcial_2: 3.2, final: 2.5 },
      { id: 7, materia_id: 7, parcial_1: 4.2, parcial_2: 5.0, final: 4.8 },
    ]
    const materias: Array<Materia> = [
      { id: 11, nombre: "Fisica Mecanica", semestre: 2 },
      { id: 21, nombre: "Calculo Diferencial", semestre: 2 },
      { id: 31, nombre: "Electiva V", semestre: 10 },
      { id: 10, nombre: "Inteligencia Artiicial", semestre: 9 },
      { id: 41, nombre: "Formulacion de Proyectos", semestre: 8 },
      { id: 6, nombre: "Administracion General", semestre: 8 },
      { id: 7, nombre: "Gestion Tecnologica", semestre: 8 },
      
    ]
    return {notas, materias};
  }
  getId(notas:Nota[]):number {
    return notas.length > 0 ? Math.max(...notas.map(nota => nota.id)) + 1 : 11;
  }
  getId2(materia:Materia[]):number {
    return materia.length > 0 ? Math.max(...materia.map(nota => nota.id)) + 1 : 11;
  }
}
