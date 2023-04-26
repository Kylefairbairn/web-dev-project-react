import axios from "axios";

const PROFILE_API_URL = "http://localhost:4000/api/profiles"

export const updateGameProfile = async (profileId, updatedFields) => {
    const response = await axios.put(`${PROFILE_API_URL}/${profileId}`, updatedFields);
    return response.data;
};

export const findProfileByUserId = async (uid) => {
    const response = await axios.get(`${PROFILE_API_URL}/user/${uid}`)
    return response.data;
};

export const createProfile = async (profile) => {
    const response = await axios.post(`${PROFILE_API_URL}/`, profile)
    return response.data;
}