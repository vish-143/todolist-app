import { ADD, DELETE, EDIT } from "./action_types";

export const addItem = (task) => (dispatch) => {
    dispatch({
        type: ADD,
        payload: task
    })
}

export const deleteItem = (task) => (dispatch) => {
    dispatch({
        type: DELETE,
        payload: task
    })
}

export const editItem = (task,id) => (dispatch) => {
    console.log(task);
    dispatch({
        type: EDIT,
        payload: {task:task,id:id}
    })
}