import {SET_SNACK_BAR_INFO} from "../constants/snackBarActionTypes";

export const snackInitialState = {
    message: "",
    variant: ""
}
const snackReducer = (state = snackInitialState, action) => {
    switch (action.type){
        case SET_SNACK_BAR_INFO: {
            console.log(2)
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export default snackReducer;

