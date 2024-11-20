const express = require('express');
const cors = require('cors');
const app = express();
let tareas = [];

app.use(cors());
app.use(express.json());

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const tarea = { id: tareas.length + 1, ...req.body };
  tareas.push(tarea);
  res.json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  tareas = tareas.filter(tarea => tarea.id !== id);
  res.json({ message: 'Tarea eliminada' });
});

app.put('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tareas.findIndex(tarea => tarea.id === id);
  if (index !== -1) {
    tareas[index] = { ...tareas[index], ...req.body };
    res.json(tareas[index]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

//Agregar a tarea destacadas ------------------
app.put('/tareas/:id/destacar', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tareas.findIndex(tarea => tarea.id === id);
  if (index !== -1) {
    tareas[index].destacada = req.body.destacada; // Actualiza el estado
    res.json(tareas[index]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

