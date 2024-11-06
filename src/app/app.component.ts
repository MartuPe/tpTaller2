import { Component, OnInit } from '@angular/core';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nombre = 'A-nota-2';
  tareas: Tarea[] = [];

  ngOnInit() {
    this.listarTareas();
  }

  listarTareas() {
    // llamaria a la api?
    this.tareas = [
      { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', completada: false },
      { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', completada: false },
    ];
  }

  crearTarea(titulo: string, descripcion: string) {
    const newTarea: Tarea = { id: this.tareas.length + 1, titulo, descripcion, completada: false };
    this.tareas.push(newTarea);
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(tareas => tareas.id !== id);
  }

  modificarTarea(id: number) {
    this.tareas = this.tareas.filter(tareas => tareas.id !== id);
  }

  toggleCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
  }
}
