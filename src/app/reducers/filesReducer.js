import * as fileActionTypes from '../../app/constants/filesActionTypes';
import {filesInitialState} from '../actions/fileActionCreators';

const fileReducer = (state = filesInitialState, action) => {
    switch (action.type){
        case fileActionTypes.FETCH_FILE_LIST: {
            return action.payload;
        }
        case fileActionTypes.DELETE_FROM_FILE_LIST: {
            return {...state, list : state.list.filter(file => file.id !== action.payload)};
        }
        case fileActionTypes.SET_CURRENT_FILE_ID: {
            return {...state, currFileId: action.payload};
        }
        case fileActionTypes.UPDATE_FILE: {
            return {...state, list: state.list.map(f => f.id === action.payload.id ? action.payload: f)}
        }
        default: return state;
    }
}

export default fileReducer;