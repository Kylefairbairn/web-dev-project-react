import axios from "axios";

const CHALLENGE_REST_API_URL = "http://localhost:4000/api/challenges";


export const findAllChallenges = () =>
    axios.get(CHALLENGE_REST_API_URL)
        .then(response => response.data);

export const findChallengerOneByUserId = (uid) =>
    axios.get(`CHALLENGE_REST_API_URL/user/one/${uid}`)
        .then(response => response.data)


export const findChallengerTwoByUserId = (uid) =>
    axios.get(`CHALLENGE_REST_API_URL/user/two/${uid}`)
        .then(response => response.data)

export const createChallenge = (challenge) =>
    axios.post(`${CHALLENGE_REST_API_URL}`, challenge)
        .then(response => response.data)

export const updateChallenge = (cid, updates) =>
    axios.put(`${CHALLENGE_REST_API_URL}/${cid}`, updates)
        .then(response => response.data)




