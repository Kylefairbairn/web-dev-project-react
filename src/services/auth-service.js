import axios from "axios";
//const BASE_URL = process.env.REACT_APP_BASE_URL

const BASE_URL = "http://localhost:4000"
const USERS_REST_API_URL = "http://localhost:4000/api/users";
const AUTH_API = `${BASE_URL}/api/users`

const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${AUTH_API}/signup`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${USERS_REST_API_URL}/profile`)
        .then(response => response.data);


// export const profile = () =>
//     api.post(`${USERS_REST_API_URL}/profile`)
//         .then(response => response.data);

export const logout = (user) =>
    api.post(`${USERS_REST_API_URL}/logout`, user)
        .then(response => response.data)

// export const login = (credentials) =>
//     api.post(`${AUTH_API}/login`, credentials)
//         .then(response => response.data);

export const login = async (user) => {
    const response = await api.post(`${USERS_REST_API_URL}/login`, user);
    return response.data;
};