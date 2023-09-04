import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';

let tasks = [
  { id: 1, title: "CSS&HTML", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "React", isDone: false },
  { id: 4, title: "Redux", isDone: false }
]

useState(tasks)

function removeTasks(id: number) {
  tasks = tasks.filter(t => t.id !== id)
}


function App() {
  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks} removeTasks={removeTasks} />
    </div>
  );
}



export default App;
