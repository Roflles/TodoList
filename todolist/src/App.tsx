import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active"; 

function App() {


  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false }
  ]);
 
  console.log(tasks)

  function removeTasks(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all")

  function chacngeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList title="What to learn"
        tasks={tasksForTodolist}
        removeTasks={removeTasks}
        chacngeFilter={chacngeFilter}
      />
    </div>
  );
}



export default App;
