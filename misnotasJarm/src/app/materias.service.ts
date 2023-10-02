import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Materia } from './materia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MensajeService } from "./mensaje.service";
@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private materiaUrl = 'api/materias';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', })
  };
  
  constructor(private mensajeService : MensajeService,
    private http: HttpClient){}

  private registro(mensaje: string){
    this.mensajeService.agregar(mensaje);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T>=> {
      this.registro(`${operation} fallo: ${error.message}` );
      return of(result as T);
    }
  }
  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.materiaUrl)
      .pipe(
        tap(/* _ => this.registro("obtiene Materia") */),
        catchError(this.handleError<Materia[]>("getMateria", []))
      );    
  }

  getMateria(id: number): Observable<Materia> {
    const url = `${this.materiaUrl}/${id}`;
    return this.http.get<Materia>(url)
      .pipe(
        tap(_ => this.registro(`materia encontrada: ${id}`)),
        catchError(this.handleError<Materia>(`getMateria id=${id}`))
      );
  }


  /** PUT: actualizar Materia en el servidor */
  actualizar(materia: Materia ): Observable<any> {
    return this.http.put(this.materiaUrl, materia, this.httpOptions).pipe(
      tap(_ => this.registro(`materia actualizada id=${materia.id}`)),
      catchError(this.handleError<any>(`actualizar`))
    );
  }

  



  /** POST: crear nueva Materia en el servidor */
  crearNuevo(materia: Materia ): Observable<Materia> {
    
    return this.http.post<Materia>(this.materiaUrl, materia, this.httpOptions)
    .pipe(
      tap((nuevaMateria: Materia) => this.registro(`materia creada w/ id=${nuevaMateria.id}`)),
      catchError(this.handleError<Materia>("crearNuevo"))
    );
  }

  /** DELETE: eliminar Materia del servidor */
  borrarMateria(id: number ): Observable<Materia> {
    const url = `${this.materiaUrl}/${id}`;
    return this.http.delete<Materia>(url, this.httpOptions).pipe(
      tap(_ => this.registro(`materia borrada id=${id}`)),
      catchError(this.handleError<Materia>(`borrarMateria`))
    );
  }


  /* GET heroes whose name contains search term */
  searchNotaByMateria(stMateria: string): Observable<Materia[]> {
    const url = `${this.materiaUrl}/?nombre=${stMateria}`;
    if (!stMateria.trim()) {
      return of([]);
    }
    return this.http.get<Materia[]>(url).pipe(
      tap(x => x.length ? this.registro(`found heroes matching "${stMateria}"` ) 
      : this.registro(`no heroes matching "${stMateria}"`)),
      catchError(this.handleError<Materia[]>('searchHeroes', []))
    );
  }


}
