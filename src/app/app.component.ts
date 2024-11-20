import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './service/api-service.service';
import { Tarea } from './models/Tarea.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nombre = 'A - NOTA - 2';
  tareas: Tarea[] = [];

  constructor(private tareaService: ApiServiceService) {}

  ngOnInit() {
    this.listarTareas();
  }

  listarTareas() {
    this.tareaService.listarTareas().subscribe(tareas => this.tareas = tareas);
  }

  crearTarea() {
    const titulo = prompt('Titulo de su Tarea:');
    const descripcion = prompt('Descripción de su Tarea:');
    if (titulo && descripcion) {
      const tarea: Tarea = { id: this.tareas.length + 1, titulo, descripcion, completada: false };
      this.tareaService.crearTarea(tarea).subscribe(nuevaTarea => this.tareas.push(nuevaTarea));
    } else {
      alert('El título y la descripción son obligatorios');
    }
  }

  eliminarTarea(id: number) {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    });
  }

  modificarTarea(id: number) {
    const tarea = this.tareas.find(tarea => tarea.id === id);
    if (tarea) {
      const titulo = prompt('Nuevo título', tarea.titulo) || tarea.titulo;
      const descripcion = prompt('Nueva descripción', tarea.descripcion) || tarea.descripcion;
      this.tareaService.modificarTarea(id, { ...tarea, titulo, descripcion }).subscribe(tareaActualizada => {
        const index = this.tareas.findIndex(t => t.id === id);
        this.tareas[index] = tareaActualizada;
      });
    }
  }

  tareaCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    this.tareaService.tareaCompletada(tarea).subscribe();
  }
}
