import axios from "axios";

const BASE_URL = "http://localhost:4000";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

const USERS_REST_API_URL = "http://localhost:4000/api/users";


export const createUser = (user) =>
    axios.post(`${USERS_REST_API_URL}`, user)
        .then(response => response.data);

export const findUserByUserName = (username) =>
    axios.get(`${USERS_REST_API_URL}/username/${username}`)

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
    axios.delete(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    axios.delete(`${USERS_API}/username/${username}/delete`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
    axios.post(`${LOGIN_API}`, credentials)
        .then(response => response.data);

export const updateUser = (uid, updatedUser) =>
    axios.put(`${USERS_REST_API_URL}/${uid}`,updatedUser)
        .then(response => response.data)

const service = {
    findAllUsers,
    deleteUser,deleteUsersByUsername, findUserById, updateUser,findUserByUserName
}

export default service;