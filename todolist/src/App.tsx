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
  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTasks(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(tasksId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === tasksId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  

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
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}



export default App;
