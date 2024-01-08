import { ADD, CHECK, COMPLETED, DELETE, EDIT } from "./action_types";

const initialValue = {
    inputValue: [],
    afterChecked: []
}

export const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD: {
            return { ...state, inputValue: [...state.inputValue, action.payload] }
        }
        case EDIT: {
            const afterEdit = state.inputValue.map((item) => {
                if (item.id === action.payload.id) {
                    item=action.payload.task
                }
                return item
            })

            return { ...state, inputValue: afterEdit }
        }
        case DELETE: {
            let afterDelete = state.inputValue.filter((state) => {
                return state !== action.payload
            })
            return { ...state, inputValue: [...afterDelete] }
        }
        case CHECK: {
            return { ...state, inputValue: action.payload }
        }
        case COMPLETED: {
            return { ...state, afterChecked: [...action.payload] }
        }
        default: {
            return { ...state }
        }
    }
}