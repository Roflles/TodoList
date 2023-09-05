import React from "react"
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
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li><input type="checkbox" checked={t.isDone} />
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

