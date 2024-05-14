import {SET_SNACK_BAR_INFO} from "../constants/snackBarActionTypes";
import {snackInitialState} from '../reducers/snackBarReducer';

export const setSnackState = (body = snackInitialState) => {
    return {
        type: SET_SNACK_BAR_INFO,
        payload: body
    }
}