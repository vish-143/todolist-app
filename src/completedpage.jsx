import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosList } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Completedpage = () => {
    const afterChecked = useSelector((state) => state.afterChecked)
    const history = useHistory();
    const homePage = () => {
        history.push("/")
    }

    return (
        <div className="mainContainer">
            <div>
                <div className="addHeader">
                    <div className="addArrow"><FaArrowLeftLong onClick={homePage} /></div>
                    <div className="addHead">Completed Task</div>
                </div>
                <div className="taskContainer">

                    {

                        afterChecked.length !== 0 ? afterChecked?.map((item) => {
                            return (
                                <div className="card" key={item.id}>
                                    <div className="details">
                                        <div className="title">{item.title}</div>
                                        <div className="subTitle">{item.detail}</div>
                                    </div>
                                    <div className="date">{item.date}</div>
                                </div>
                            )
                        }) : <div className="notCompleted pointer" onClick={homePage}>There is no completed task...
                            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                                <div>Go Back Home</div>
                                <div style={{ fontSize: "35px" }}><TiArrowBackOutline /></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="footerSection">
                <div className="lsitIcon" style={{ fontSize: "30px", textAlign: "center" }} onClick={homePage}><IoIosList className="allIcon" /><div style={{ fontSize: "18px" }}>All</div></div>
                <div className="completeIcon" style={{ fontSize: "30px", textAlign: "center" }} ><IoCheckmark className="comIcon" /><div style={{ fontSize: "18px" }}>Completed</div></div>
            </div>
        </div>
    )
}