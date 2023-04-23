import axios from "axios";

const LIKES_REST_API_URL = "http://localhost:4000/api/likes";

export const likeGame = (like) =>
    axios.post(`${LIKES_REST_API_URL}`, like)
        .then(response => response.data)

export const deleteLike = (lid) =>
    axios.delete(`${LIKES_REST_API_URL}/${lid}`)
        .then(response => response.data)

export const getLikesbyUser = (uid) =>
    axios.get(`${LIKES_REST_API_URL}/user/${uid}`)
        .then(response => response.data)