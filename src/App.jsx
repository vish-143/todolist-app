import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "./service/action";
import { CHECK, EDIT, THEME } from "./service/actiontypes";


const App = () => {

    const allList = useSelector((state) => state.inputValue)
    const dispatch = useDispatch()
    const [task, setTask] = useState("");
    const [check, setCheck] = useState(0)
    const [newId, setnewId] = useState()
    const color = ["Tomato", "MediumSeaGreen", "SlateBlue", "Violet"]
    const [count, setCount] = useState(0)
    const [date, setDate] = useState("")
    const theme = useSelector((state) => state.theme)
    const currTime = new Date().toLocaleTimeString();

    function generateCustomId() {
        return Math.floor(100 + Math.random() * 90);
    }

    const handleChange = (e) => {
        if (e.key === 'Enter' && check === 0 && task !== "" && date !== "") {
            let id = generateCustomId()
            dispatch(addItem(task, id, color[count], date))
            setCount(count + 1)
            if (count === 3) {
                setCount(0)
            }
            setTask("")
            setDate("")
        }
        else if (e.key === 'Enter' && check === 1 && task !== "" && date !== "") {
            const afterEdit = allList.map((item) => {
                if (item.id === newId) {
                    item.list = task
                    item.date = date
                }
                return item
            })
            dispatch({
                type: EDIT,
                payload: afterEdit
            })
            setTask("")
            setCheck(0)
            setDate("")
        }
    }

    const editList = (state) => {
        setTask(state.list)
        setDate(state.date)
        setnewId(state.id)
        setCheck(1)
    }

    const deleteList = (task) => {
        dispatch(deleteItem(task))

    }

    const checkBox = (e, state) => {
        if (e.target.checked) {
            const afterCheck = allList.map((item) => {
                if (state.id === item.id) {
                    item.checked = true
                }
                return item
            })
            dispatch({
                type: CHECK,
                payload: afterCheck
            })
        }
        else  {
            const checkFalse = allList.map((item) => {
                if (state.id === item.id) {
                    state.checked = false
                }
                return item
            })
            dispatch({
                type: CHECK,
                payload: checkFalse
            })
        }
    }

    const changeTheme = () => {
        dispatch({
            type: THEME,
            payload: !theme
        })
    }

    const completedTask = allList?.filter((item) => {
        return item.checked === true
    })

    const activeTask = allList?.filter((item) => {
        return item.checked === false
    })


    const allDate = allList.reduce((acc, cur) => {
        acc[cur.date] ? acc[cur.date].push(cur) : acc[cur.date] = [cur]
        return acc
    }, {})
    allList.sort()
    console.log(Object.entries(allDate));
    return (
        <div className={`${theme || currTime > "6:00:00 PM" ? "dark" : "light"}`}>
            <div className="header">
                <h1 className="head">To Do List</h1>
                <div onClick={changeTheme} className="changeTheme">☀︎</div>
            </div>
            <div className="contentContainer">
                <div className="addDetails">
                    <div className="inputFields">
                        <input type="date" className="dateField" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                        <input type="text" name="task" className="input" placeholder="Add Your Task..!!" value={task} onKeyDown={handleChange} onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <h1>ALL TASK</h1>
                    <div className="taskStatus">
                        <h5>Total Tasks: {allList.length}</h5>
                        <h5>Active Tasks: {activeTask.length}</h5>
                        <h5>Completed Tasks: {completedTask.length}</h5>
                    </div>
                </div>
                <div className="showDetails" style={{ display: "flex" }}>
                    {
                        Object.entries(allDate)?.sort().map((item, index) => {
                            return (
                                <div key={index} style={{ width: "fit-content", margin: "2px" }}>
                                    <h3 style={{ textAlign: "center" }}>{item[0]}</h3>
                                    {item[1].map((state) => {
                                        return (

                                            <div className="card shadow" key={state.id} style={{ backgroundColor: state.color }}>
                                                <div className="checkBoxDiv">
                                                    <input type="checkbox" className="checkBox" onChange={(e) => checkBox(e, state)} />
                                                    <label htmlFor="checkBox" className="lable">{state.list}</label>
                                                </div>
                                                <div className="cardDate">{state.date}</div>
                                                <div className="buttons">
                                                    <MdEdit cursor={"pointer"} size={30} onClick={() => editList(state)} />
                                                    <AiFillDelete cursor={"pointer"} size={30} onClick={() => deleteList(state)} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div >
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default App