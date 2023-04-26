import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentChallenge: {
        challengeId: "",
        userOne: "",
        userTwo: "",
        game: [],
        userOneScore: "",
        userTwoScore: ""
    }
}


const createChallengeReducer = createSlice({
    name: "challenge",
    initialState,
    reducers:{
        updateChallenge(state,action) {
            state.currentChallenge = action.payload;
        },
    },
});

export const {updateChallenge} = createChallengeReducer.actions
export default createChallengeReducer.reducer
