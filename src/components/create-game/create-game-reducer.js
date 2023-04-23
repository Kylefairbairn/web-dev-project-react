import {createSlice} from "@reduxjs/toolkit";


// const currentGame = {
//     question_amount: 34,
//     question_category: 10,
//     question_type: "multiple",
//     question_difficulty: "easy"
// }

const initialState = {
    currentGame: {
        question_amount: 10,
        question_category: 9,
        question_type: "Multiple Choice",
        question_difficulty: "easy"
    }
}


const createGameReducer = createSlice({
    name: "game",
    // initialState: currentGame,
    initialState,
    reducers:{
        updateGame(state,action) {
            state.currentGame = action.payload;
        },
    },
});

export const {updateGame} = createGameReducer.actions
export default createGameReducer.reducer
