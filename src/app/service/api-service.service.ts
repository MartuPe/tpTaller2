import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3000/tareas';
  constructor(private http: HttpClient) { }

  listarTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  modificarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  tareaCompletada(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
  
  destacarTarea(id: number, destacada: boolean): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}/destacar`, { destacada });
  }

}
