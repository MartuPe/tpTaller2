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
  nombre = 'A - NOTA - 2';
  tareas: Tarea[] = [];

  ngOnInit() {
    this.listarTareas();
  }

  listarTareas() {
    // llamaria a la api o a la bd para traer las tareas
    this.tareas = [
      { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', completada: false },
      { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', completada: false },
    ];
  }

  crearTarea() {
    const titulo = prompt('Titulo de su Tarea:');
    const descripcion = prompt('Descripción de su Tarea:');
    if (titulo && descripcion) {
      const tarea: Tarea = { id: this.tareas.length + 1, titulo, descripcion, completada: false };
      this.tareas.push(tarea);
    } else {
      alert('El título y la descripción son obligatorios');
    }
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(tareas => tareas.id !== id);
  }

  modificarTarea(id: number) {
    const tarea = this.tareas.find(tareas => tareas.id === id);
    if (tarea) {
      tarea.titulo = prompt('Nuevo título', tarea.titulo) || tarea.titulo;
      tarea.descripcion = prompt('Nueva descripción', tarea.descripcion) || tarea.descripcion;
    }
  }

  tareaCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
  }
}
