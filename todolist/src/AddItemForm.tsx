import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "@mui/material";

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTasks = () => {

        if (title.trim() === "") {
            return setError("Title is error");
        }
        props.addItem(title.trim());
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
            <Button onClick={addTasks} variant={"contained"} color={"primary"} >+</Button>
            {error && <div className="error-messege">{error}</div>}
        </div>
    )
}