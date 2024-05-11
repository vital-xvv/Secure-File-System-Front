import {
    DELETE_FROM_USER_LIST,
    UPDATE_USER_LIST,
    CREATE_NEW_USER_IN_USER_LIST,
    FETCH_USER_LIST
} from '../constants/userListActionTypes';


export const deleteUser = (id) => ({
    type: DELETE_FROM_USER_LIST,
    payload: id
})

export const addToList = (userInfo) => ({
    type: CREATE_NEW_USER_IN_USER_LIST,
    payload: userInfo
})

export const populateList = (userList) => ({
    type: FETCH_USER_LIST,
    payload: userList
})

export const updateList = (id, userInfo) => ({
    type: UPDATE_USER_LIST,
    payload: {
        id,
        userInfo
    }
})