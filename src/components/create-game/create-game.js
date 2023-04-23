import React, { useEffect, useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {updateGame} from "./create-game-reducer";
import {useNavigate} from "react-router";
import "./create-game.css"


const CreateGame = () => {

    const navigate = useNavigate()
    const currentGame = useSelector((state) => state.game)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(currentGame.currentGame.question_amount);
    const [category, setCategory] = useState(currentGame.currentGame.question_category);
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState(currentGame.currentGame.question_difficulty);
    const [type, setType] = useState(currentGame.currentGame.question_type);

    const categoryURL = "https://opentdb.com/api_category.php";

    const difficultyList = ["Easy", "Medium", "Hard"];
    const questionType = ["Multiple Choice", "True/False"];

    const getCategories = async () => {
        const response = await axios.get(categoryURL)
        setCategories(response.data.trivia_categories);

    }

    console.log(categories)

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        if (type === "Multiple Choice") {
            setType("multiple choice")
        }
        if (type === "True/False"){
        setType("boolean")
        }
        if(difficulty === "Easy"){
            setDifficulty("easy")
        }
        if(difficulty === "Medium"){
            setDifficulty("medium")
        }
        if(difficulty === "Hard"){
            setDifficulty("hard")
        }

    }, [type,difficulty])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateGame({question_amount: amount,question_category: category,question_difficulty: difficulty,question_type: type}))
        navigate("/trivia/play")
    }


    return (

        <div className="game-form-container">
            <div className="game-form-styling">
                <h1>Create a Game</h1>
                <div className="game-form-input-container">
                    <label>Number of Questions</label>
                    <input
                        placeholder="Enter number 1-50"
                        onChange={(e) => setAmount(e.target.value)}
                        className="game-form-input"
                    />
                </div>
                <div className="game-form-select-container">
                    <label>Choose a category</label>
                    <div className="game-select-styling">
                        <select onChange={(e) => setCategory(e.target.value)}>
                            {categories
                                ? categories.map((eachCategory) => {
                                    return (
                                        <option key={eachCategory.id} value={eachCategory.id}>
                                            {eachCategory.name}
                                        </option>
                                    );
                                })
                                : null}
                        </select>
                    </div>
                </div>
                <div className="game-form-select-container">
                    <label>Choose Difficulty</label>
                    <select
                        onChange={(e) => setDifficulty(e.target.value.toLowerCase())}
                        placeholder="easy"
                        className="game-select-styling"
                    >
                        {difficultyList.map((eachDifficulty) => {
                            return (
                                <option key={eachDifficulty} value={eachDifficulty}>
                                    {eachDifficulty}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button onClick={handleSubmit} className="game-form-submit-button">
                    Submit
                </button>
            </div>
        </div>


    );
};
export default CreateGame;

