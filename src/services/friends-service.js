import axios from "axios";

const FRIENDS_REST_API_URL = "http://localhost:4000/api/friends";

export const createFriend = (friendship) =>
    axios.post(`${FRIENDS_REST_API_URL}`, friendship)
        .then(response => response.data)

export const findFriendsByUserID = (uid) =>
    axios.get(`${FRIENDS_REST_API_URL}/users/${uid}`)
        .then(response => response.data)

export const deleteFriend = (fid) =>
    axios.delete(`${FRIENDS_REST_API_URL}/${fid}`)
        .then(response => response.data)

export const findFriendByUsername = (username) =>
    axios.get(`${FRIENDS_REST_API_URL}/one/${username}`)
        .then(response => response.data)

const service = {
    createFriend,findFriendsByUserID,deleteFriend,findFriendByUsername
}

export default service;