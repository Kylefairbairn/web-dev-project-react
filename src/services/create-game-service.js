import axios from "axios";

const BASEURL = "https://opentdb.com/api.php";
const GAME_REST_API_URL = "http://localhost:4000/api/game";
const PROFILE_REST_API_URL = "http://localhost:4000/api/profiles";
const PROFILE_DATA_REST_API_URL = "http://localhost:4000/api/profiles/user";


export const createGame = async (amount,category,difficulty,type) => {
    const response = await axios.get(
        `${BASEURL}?amount=${amount}&category=${category}&difficulty=${difficulty}`)
    return response.data
}

export const findTotalNumberGames = async (userID) => {
    const response = await axios.get(`${GAME_REST_API_URL}/${userID}`)
    return response.data
}


export const saveCurrentGame = (gameData) => {
    const response = axios.post(`${GAME_REST_API_URL}`, gameData)
        .then(response => response.data)
        console.log(response)
}

export const updateGameProfile = async (profileId, updatedFields) => {
    const response = await axios.put(`${PROFILE_REST_API_URL}/${profileId}`, updatedFields);
    return response.data;
};

export const getProfileData = async (userID) => {
        const response = await axios.get(`${PROFILE_DATA_REST_API_URL}/${userID}`);
        return response.data;
};

export const findGamesByUserId = async (uid) =>
    axios.get(`${GAME_REST_API_URL}/user/${uid}`)
        .then(response => response.data)

