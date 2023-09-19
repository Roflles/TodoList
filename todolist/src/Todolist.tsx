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
    changeTaskStatus: (tasksId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState("");
    let[error, setError] = useState<string | null>(null)

    const addTasks = () => {
    
        if (title.trim() === "") {
            return setError("Title is error");
        }
        props.addTask(title.trim());
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

    
    const onAllClickHandler = () => { props.chacngeFilter("all") }
    const onActiveClickHandler = () => { props.chacngeFilter("active") }
    const onCompletedClickHandler = () => { props.chacngeFilter("completed") }
    

    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveTasks = () => { props.removeTasks(t.id) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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

