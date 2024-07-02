import axios from "axios";
import utils from "../../misc/storage/index"
import {keys} from "../../misc/storage";
import {PUBLIC_URL} from "./index";


const fileApi = axios.create({
    baseURL: `${PUBLIC_URL}/file`,
})



// File API Endpoint Methods

export const fetchFilteredFilePage = (body) => {
    return fileApi.post("/_list", body, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}})
}

export const deleteById = (fileId) => {
    return fileApi.delete(`/${fileId}`, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}})
}

export const putUpdateFile = (fileDto) => {
    return fileApi.put(`/${fileDto.id}`,fileDto, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}})
}

export const getAllLanguages = () => {
    return fileApi.get("/languages", {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}});
}

export const createFile = (fileDto) => {
    return fileApi.post("", fileDto, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}})
}