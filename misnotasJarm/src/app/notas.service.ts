import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Nota } from './nota';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MensajeService } from "./mensaje.service";
import { Materia } from './materia';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private notaUrl = 'api/notas';
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
  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.notaUrl)
      .pipe(
        tap(_ => this.registro("obtiene Nota")),
        catchError(this.handleError<Nota[]>("getNota", []))
      );    
  }

  getNota(id: number): Observable<Nota> {
    const url = `${this.notaUrl}/${id}`;
    return this.http.get<Nota>(url)
      .pipe(
        tap(_ => this.registro(`nota encontrada: ${id}`)),
        catchError(this.handleError<Nota>(`getNota id=${id}`))
      );
  }


  /** PUT: actualizar Nota en el servidor */
  actualizar(nota: Nota ): Observable<any> {
    return this.http.put(this.notaUrl, nota, this.httpOptions).pipe(
      tap(_ => this.registro(`nota actualizada id=${nota.id}`)),
      catchError(this.handleError<any>(`actualizar`))
    );
  }

  

  /** POST: crear nueva Nota en el servidor */
  crearNuevo(nota: Nota ): Observable<Nota> {
    console.log("llega aquí", nota);  
    return this.http.post<Nota>(this.notaUrl, nota, this.httpOptions)
    .pipe(
      tap((nuevaNota: Nota) => this.registro(`nota creada id=${nuevaNota.id}`)),
      catchError(this.handleError<Nota>("crearNuevo"))
    );
  }

  /** DELETE: eliminar Nota del servidor */
  borrarNota(id: number ): Observable<Nota> {
    const url = `${this.notaUrl}/${id}`;
    return this.http.delete<Nota>(url, this.httpOptions).pipe(
      tap(_ => this.registro(`nota borrada id=${id}`)),
      catchError(this.handleError<Nota>(`borrarNota`))
    );
  }

  /* GET heroes whose name contains search term */
  searchByMateriaId(materiaId: number):Observable<Nota[]> {
    const url = `${this.notaUrl}/?materia_id=${materiaId}`;
    if (materiaId!) {
      return of([]);
    }
    return this.http.get<Nota[]>(url).pipe(
      tap(x => x.length ? this.registro(`found heroes matching "${materiaId}"` ) 
      : this.registro(`no heroes matching "${materiaId}"`)),
      catchError(this.handleError<Nota[]>('searchHeroes', []))
    );
  }


  public getAllNotas(): Observable<any[]> {
    let response1 = this.http.get<Nota>(this.notaUrl);
    let response2 = this.http.get<Materia>('api/materias');
    return forkJoin([response1, response2 ]);
  }

  public getNotasByMateria(stMateria: string): Observable<any[]> {
    let response1 = this.http.get<Nota>(this.notaUrl);
    let response2 = this.http.get<Materia>('api/materias/nombre='+stMateria);
    return forkJoin([response1, response2 ]);
  }

}
