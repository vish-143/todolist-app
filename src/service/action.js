import { ADD, DELETE } from "./actiontypes";

export const addItem = (task, id, color,date) => (dispatch) => {
    dispatch({
        type: ADD,
        payload: { list: task, id: id, color: color, checked: false,date:date}
    })
}

export const deleteItem = (task) => (dispatch) => {
    dispatch({
        type: DELETE,
        payload: task
    })
}


