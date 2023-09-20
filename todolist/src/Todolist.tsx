import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

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
    let [title, setTitle] = useState("");
    let[error, setError] = useState<string | null>(null)

    const addTasks = () => {
    
        if (title.trim() === "") {
            return setError("Title is error");
        }
        props.addTask(title.trim(), props.id);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
           addTasks();
        }
    }

    
    const onAllClickHandler = () => props.chacngeFilter("all", props.id);
    const onActiveClickHandler = () => props.chacngeFilter("active", props.id);
    const onCompletedClickHandler = () => props.chacngeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTasks}>+</button>
                {error &&  <div className="error-messege">{error}</div>}
            </div>
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

