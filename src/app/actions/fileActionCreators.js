import * as fileActionTypes from '../../app/constants/filesActionTypes';
import * as fileApi from '../api/fileApi';
import {setSnackState} from "./snackBarActionCreators";


export const filesInitialState = {
    list: [],
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 0,
    currFileId: 0,
    //Filter Options
    ownerId: null,
    extension: "",
}

const pagedFilteredInitState = {
    page : 0,
    size : 10,

    // Optional Fields For Filtering
    extension: "",
    ownerId: null,
}

export const fetchFileList =
    (filePageObj = filesInitialState) => ({
        type: fileActionTypes.FETCH_FILE_LIST,
        payload: filePageObj
})

export const deleteFile = (fileId) => ({
    type: fileActionTypes.DELETE_FROM_FILE_LIST,
    payload: fileId
})

export const currentFile = (fileId) => ({
    type: fileActionTypes.SET_CURRENT_FILE_ID,
    payload: fileId
})

export const updateFileItem = (fileDto) => ({
    type: fileActionTypes.UPDATE_FILE,
    payload: fileDto
})


// Actions with API calls
export const fetchPage = (body = pagedFilteredInitState) => async (dispatch) => {
    const files = await fileApi.fetchFilteredFilePage(body).then(resp => resp.data);
    dispatch(fetchFileList(
{
            ...files,
            page: body.page,
            size: body.size,
            extension: body.extension,
            ownerId: body.ownerId,
            currFileId: body.currFileId
}))}

export const deleteFileById = (fileId, callBack) => async (dispatch, getState) => {
    const state = getState().files;
    const body = {
        size: state.size,
        page: state.page,
        extension: state.extension,
        ownerId: state.ownerId
    }

    await fileApi.deleteById(fileId)
        .then(res => {
        dispatch(setSnackState({
            message: `Successfully deleted file with id: ${fileId}!`,
            variant: "success"
        }));

    }).catch(error => {
        dispatch(setSnackState({
            message: error.response.data.message,
            variant: "error"
        }));

    }).finally(() => {
        callBack(getState());
        dispatch(fetchPage(body));
    });
}

export const updateFile = (fileDto, callBack) => (dispatch, getState) => {
    fileApi.putUpdateFile(fileDto)
        .then(res => {
            dispatch(setSnackState({
                message: `Successfully updated file with id: ${res.data.id}!`,
                variant: "success"
            }));
            dispatch(updateFileItem(res.data));

        }).catch(error => {
            dispatch(setSnackState({
                message: error.response.data.message,
                variant: "error"
            }));
        }).finally(() => callBack(getState()));
}

export const createNewFile = (fileDto, callback) => (dispatch, getState) => {
    fileApi.createFile(fileDto).
        then(res => {
            dispatch(setSnackState({
                message: `Successfully created file with id: ${res.data.id}!`,
                variant: "success"
            }));
        }).catch(error => {
            dispatch(setSnackState({
                message: error.response.data.message,
                variant: "error"
            }));
        }).finally(() => callback(getState()));
}



export default {fetchPage, deleteFileById};
