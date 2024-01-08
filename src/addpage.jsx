import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addItem } from "./service/action";

function generateCustomId() {
    return Math.floor(100 + Math.random() * 90);

}
export const Addpage = () => {
    let id;
    const [task, setTask] = useState({
        title: "",
        detail: "",
        date: ""
    })

    const history = useHistory();
    const dispatch = useDispatch()

    const inputsHandler = (e) => {
        id = generateCustomId()
        setTask({
            ...task, [e.target.name]: e.target.value, id: generateCustomId(),
            checked: false
        })
    }

    const handleClick = () => {
        if(task.title!==""&&task.detail!==""&&task.date!==""){
            dispatch(addItem(task));
            history.push("/")
            setTask({
                title: "",
                detail: "",
                date: ""
            })
        }
        else{
            alert("Please Enter All Details")
        }
       
    }

    const homePage = () => {
        history.push("/")
    }

    console.log(typeof task);
    return (
        <div className="addMainContainer">
            <div className="addHeader">
                <div className="addArrow"><FaArrowLeftLong onClick={homePage} /></div>
                <div className="addHead">Add Task</div>
            </div>
            <div className="addTaskContainer">
                <div className="textField">
                    <input type="date" name="date" value={task.date} onChange={inputsHandler} className="dateField" min={new Date().toISOString().split('T')[0]} />
                    <TextField id="standard-basic" label="Title" variant="standard" value={task.title} onChange={inputsHandler} name="title" />
                    <TextField id="standard-basic" label="Detail" variant="standard" value={task.detail} onChange={inputsHandler} name="detail" />
                </div>
                <div className="addButtonDiv"><Button variant="contained" className="addButton" sx={{ borderRadius: "30px" }} onClick={handleClick}>Add</Button></div>
            </div>
        </div>
    )
}