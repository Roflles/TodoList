import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import {AddItemForm} from "./AddItemForm"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistId: string) => void
    chacngeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string,todolistId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
    
    
    const onAllClickHandler = () => props.chacngeFilter("all", props.id);
    const onActiveClickHandler = () => props.chacngeFilter("active", props.id);
    const onCompletedClickHandler = () => props.chacngeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={props.addTask} id={props.id} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveTasks = () => { props.removeTasks(t.id, props.id) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveTasks}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

