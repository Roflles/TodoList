import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

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

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTasksTitle);
            setNewTasksTitle("");
        }
    }

    const addTasks = () => {
        props.addTask(newTasksTitle);
        setNewTasksTitle("");
    }
    const onAllClickHandler = () => { props.chacngeFilter("all") }
    const onActiveClickHandler = () => { props.chacngeFilter("active") }
    const onCompletedClickHandler = () => { props.chacngeFilter("completed") }
    

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasksTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTasks}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveTasks = () => { props.removeTasks(t.id) }
                        const onChangeHandler = () => { console.log("what to chance") }
                        return <li key={t.id}>
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
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

