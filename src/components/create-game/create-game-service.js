import axios from "axios";


const BASEURL = "https://opentdb.com/api.php";
const RANDOM_GAME = "https://opentdb.com/api.php?amount=10"


export const createGame = async (amount, category,difficulty,type) => {
    const response = await
        axios.get(`${BASEURL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
    return response.data.results
}

