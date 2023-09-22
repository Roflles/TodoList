import React, { ChangeEvent, KeyboardEvent, useState } from "react"

type PropsType = {
    addItem: (title: string, todoListId: string) => void
    id: string
}

export function AddItemForm(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTasks = () => {

        if (title.trim() === "") {
            return setError("Title is error");
        }
        props.addItem(title.trim(), props.id);
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
    return (


        <div>
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTasks}>+</button>
            {error && <div className="error-messege">{error}</div>}
        </div>
    )
}