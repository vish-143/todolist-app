import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosAddCircle, IoIosList } from "react-icons/io";
import { IoCheckmark, IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteItem } from "./service/action";
import { CHECK, COMPLETED } from "./service/action_types";

export const Homepage = () => {
    const allTask = useSelector((state) => state.inputValue)
    const history = useHistory();
    const dispatch = useDispatch()
    const edit=useSelector((state)=>state.edit)

    const addData = () => {
        history.push("/addpage")
    }

    const deleteTask = (item) => {
        dispatch(deleteItem(item))
    }


    const editTask = (item) => {
        history.push(`/editpage/${item.id}`)
    }


    const checkTask = (item) => {
        if (item.checked === false) {
            const afterCheck = allTask.filter((state) => {
                if (state.id === item.id) {
                    state.checked = true
                }
                return state
            })
            dispatch({
                type: CHECK,
                payload: afterCheck
            })
        }
        else {
            const checkFalse = allTask.map((state) => {
                if (state.id === item.id) {
                    state.checked = false
                }
                return state
            })
            dispatch({
                type: CHECK,
                payload: checkFalse
            })
        }
    }


    const completedTask = allTask?.filter((item) => {
        return item.checked === true
    })

    const completed = () => {
        dispatch({
            type: COMPLETED,
            payload: completedTask
        })
        history.push("/completedpage")
    }


    return (
        <div className="mainContainer">
            <div>
                <div className="header">
                    <h2 className="head">TO DO APP</h2>
                    <div className="addLogoDiv">
                        <IoIosAddCircle className="addLogo" onClick={addData} />
                    </div>
                </div>
                <div className="taskContainer">

                    {

                        allTask?.map((item) => {
                            return (
                                <div className="card" key={item.id}>
                                    <div className="details">
                                        <div className="title">{item.title}</div>
                                        <div className="subTitle">{item.detail}</div>
                                        
                                    </div>
                                    <div className="date">{item.date}</div>
                                    <div className="icons">
                                        <div className="icon"><BiEditAlt onClick={() => editTask(item)} className={`${item.checked?"disableEdit":"editIcon" }`}/></div>
                                        <div className="icon"><MdDeleteOutline onClick={() => deleteTask(item)} className="deleteIcon" /></div>
                                        <div className={`${item.checked ?"checkIconColor":"icon"}`}>{item.checked ?<FaCheckCircle className="checkIcon" onClick={() => checkTask(item)} />:<IoCheckmarkCircleOutline className="checkIcon" onClick={() => checkTask(item)} />}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="footerSection">
                <div className="lsitIcon" style={{ fontSize: "30px", textAlign: "center" }}><IoIosList className="allIcon" /><div style={{ fontSize: "18px" }}>All</div></div>
                <div className="completeIcon" style={{ fontSize: "30px", textAlign: "center" }} onClick={completed}><IoCheckmark className="comIcon"  /><div style={{ fontSize: "18px" }}>Completed</div></div>
            </div>
        </div>
    )
}