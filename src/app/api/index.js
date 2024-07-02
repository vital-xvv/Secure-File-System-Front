import axios from "axios";
import utils, {keys} from "../../misc/storage";
export const server_port = 8080
export const PUBLIC_URL = `http://localhost:${server_port}/api`


const userApi = axios.create({
    baseURL: `${PUBLIC_URL}/user`,
})

// --- Users API Endpoint Methods ---

// Get list of users
export const findAllUsers = () => {
    return userApi.get("", {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}});
}

// Create a new user
export const createUser = (userObj) => {
    return userApi.post("", userObj, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}});
}

// Delete an existing user by id
export const deleteUserById = (userId) => {
    return userApi.delete(`/${userId}`, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}});
}

// Update an existing user by id with body
export const updateUser = (userId, userObj) => {
    return userApi.put(`/${userId}`, userObj, {headers: {'Authorization': 'Bearer ' + utils.getItem(keys.ACCESS_TOKEN)}});
}

export default {findAllUsers, createUser, deleteUserById, updateUser};

