import axios from "axios";
export const server_port = 8080
export const PUBLIC_URL = `http://localhost:${server_port}/api`

const userApi = axios.create({
    baseURL: `${PUBLIC_URL}/user`
})

// --- Users API Endpoint Methods ---

// Get list of users
export const findAllUsers = () => {
    return userApi.get("");
}

// Create a new user
export const createUser = (userObj) => {
    return userApi.post("", userObj);
}

// Delete an existing user by id
export const deleteUserById = (userId) => {
    return userApi.delete(`/${userId}`);
}

// Update an existing user by id with body
export const updateUser = (userId, userObj) => {
    return userApi.put(`/${userId}`, userObj);
}

export default {findAllUsers, createUser, deleteUserById, updateUser};

