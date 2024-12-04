import axios from "axios";
import {PUBLIC_URL} from "./index";

const authApi = axios.create({
    baseURL: `${PUBLIC_URL}/auth`
})

export const fetchAuthUrl = (body) => {
    return authApi.get("/url");
}

export const fetchAccessToken = (code) => {
    return authApi.get(`/callback?code=${code}`)
}