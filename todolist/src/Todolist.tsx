import React, { useState } from "react"
import {FilterValuesType} from "./App"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    chacngeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
    const [newTasksTitle, setNewTasksTitle] = useState("");
    

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasksTitle} onChange={ (e) => {
                    setNewTasksTitle(e.currentTarget.value)
                }}/>
                <button onClick={ () => { 
                    props.addTask(newTasksTitle);
                    setNewTasksTitle("");
                    }}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} />
                        <span>{t.title}</span>
                        <button onClick={() => { props.removeTasks(t.id) }}>x</button>
                    </li>
                    )
                }
            </ul>
            <div>
                <button onClick={() => { props.chacngeFilter("all") }}>All</button>
                <button onClick={() => { props.chacngeFilter("active") }}>Active</button>
                <button onClick={() => { props.chacngeFilter("completed") }}>Completed</button>
            </div>
        </div>
    )
}

