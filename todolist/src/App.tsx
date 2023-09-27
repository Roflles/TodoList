import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { title } from 'process';

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTasks(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj});
  }

  function changeStatus(tasksId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === tasksId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }

  function changeTaskTitle(tasksId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === tasksId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  function chacngeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  

  let todolistsId1 = v1();
  let todolistsId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistsId1, title: "What to learn", filter: "all"},
    {id: todolistsId2, title: "What to buy", filter: "all"}
  ]);

  let removeTodolist = (todolistsId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
    setTodolists(filteredTodolist);
    
    delete tasksObj[todolistsId];
    setTasks({...tasksObj})
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistsId1]: [
      { id: v1(), title: "CSS&HTML", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false }
    ],
    [todolistsId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ]
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })

  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }

          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTasks={removeTasks}
            chacngeFilter={chacngeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
          />
        })
      }
    </div>
  );
}



export default App;
