import {
    DELETE_FROM_USER_LIST,
    UPDATE_USER_LIST,
    CREATE_NEW_USER_IN_USER_LIST,
    FETCH_USER_LIST
} from '../constants/userListActionTypes';

import userApi from '../api';


export const deleteUser = (id) => {
    return {
        type: DELETE_FROM_USER_LIST,
        payload: id
    }
}

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

// Actions with User API calls
export const fetchUsers = () => async (dispatch) => {
    const userList = await userApi.findAllUsers().then(response => response.data);
    dispatch(populateList(userList));
}

export const deleteUserById = (userId) => async (dispatch) => {
    await userApi.deleteUserById(userId);
    dispatch(deleteUser(userId));
}