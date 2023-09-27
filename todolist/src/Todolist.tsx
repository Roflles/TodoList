import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { strict } from "assert"

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
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (tasksId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (tasksId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) {


    const onAllClickHandler = () => props.chacngeFilter("all", props.id);
    const onActiveClickHandler = () => props.chacngeFilter("active", props.id);
    const onCompletedClickHandler = () => props.chacngeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} /> <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveTasks = () => { props.removeTasks(t.id, props.id) }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                           props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler} />
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

