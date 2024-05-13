import axios from "axios";
import {PUBLIC_URL} from "./index";


const fileApi = axios.create({
    baseURL: `${PUBLIC_URL}/file`
})

// File API Endpoint Methods

// Fetch File Page

export const fetchFilteredFilePage = (body) => {
    return fileApi.post("/_list", body)
}

export const deleteById = (fileId) => {
    return fileApi.delete(`/${fileId}`)
}

export const putUpdateFile = (fileDto) => {
    return fileApi.put(`/${fileDto.id}`,fileDto)
}

export const getAllLanguages = () => {
    return fileApi.get("/languages");
}