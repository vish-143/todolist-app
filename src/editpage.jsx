import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editItem } from "./service/action";


export const Editpage = () => {

    const allTask = useSelector((state) => state.inputValue)
    const history = useHistory();
    const dispatch = useDispatch()
    let userId = useParams();

    const editData = allTask.find((item) => {
        return item.id === +userId.id
    });

    const [task, setTask] = useState({
        title: editData.title,
        detail: editData.detail,
        date: editData.date
    })



    const inputsHandler = (e) => {
        setTask({
            ...task, [e.target.name]: e.target.value,id:+userId.id,
            checked: false
        })
    }

    const handleClick = () => {
        if(task.title!==""&&task.detail!==""&&task.date!==""){
            dispatch(editItem(task,editData.id));
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

    return (
        <div className="addMainContainer">
            <div className="addHeader">
                <div className="addArrow"><FaArrowLeftLong onClick={homePage} /></div>
                <div className="addHead">Edit Task</div>
            </div>
            <div className="addTaskContainer">
                <div className="textField">
                    <input type="date" name="date" value={task.date} onChange={inputsHandler} className="dateField" min={new Date().toISOString().split('T')[0]} />
                    <TextField id="standard-basic" label="Title" variant="standard" value={task.title} onChange={inputsHandler} name="title" />
                    <TextField id="standard-basic" label="Detail" variant="standard" value={task.detail} onChange={inputsHandler} name="detail" />
                </div>
                <div className="addButtonDiv">
                    <div>
                        <Button variant="contained" className="editButton" sx={{ borderRadius: "20px" }} onClick={handleClick}>Update</Button>
                    </div>
                    <div>
                        <Button variant="contained" className="editButton" sx={{ borderRadius: "20px" }} onClick={homePage}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}