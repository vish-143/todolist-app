import { ADD, CHECK, DELETE, EDIT, THEME } from "./actiontypes";

const initialValue={
    inputValue:[],
    theme:false
}

export const reducer=(state=initialValue,action)=>{
    switch(action.type){
        case ADD:{
            return {...state,inputValue: [...state.inputValue, action.payload]}
        }
        case EDIT:{
            return {...state,inputValue:action.payload}
        }
        case DELETE:{
            let afterDelete=state.inputValue.filter((state)=>{
                return state!==action.payload
            })
            return {...state,inputValue:[...afterDelete]}
        }
        case CHECK:{
            return {...state,inputValue:action.payload}
        }
        case THEME:{
            return {...state,theme:action.payload}
        }
        default :{
            return {...state}
        }
    }
}