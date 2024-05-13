import {
    DELETE_FROM_USER_LIST,
    UPDATE_USER_LIST,
    CREATE_NEW_USER_IN_USER_LIST, FETCH_USER_LIST
} from '../constants/userListActionTypes';

const initialUserItemState = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: 0
}

const userListReducer = (state = [], action) => {
    switch(action.type){
        case DELETE_FROM_USER_LIST: {
            return state.filter(user => user.id !== action.payload);
        }
        case CREATE_NEW_USER_IN_USER_LIST: {
            state.push(action.payload);
            return state;
        }
        case UPDATE_USER_LIST: {
            return state.map(user => user.id === action.payload.id ? action.payload.userInfo : user);
        }
        case FETCH_USER_LIST: {
            return action.payload;
        }
        default: return state;
    }
}

export default userListReducer;