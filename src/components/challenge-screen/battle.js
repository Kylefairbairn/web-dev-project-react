import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import * as challengeService from "../../services/challenge-service"
import {decode} from "html-entities";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Battle =  () => {

    const navigate = useNavigate()
    const currentChallenge = useSelector((state) => state.challenge)
    const [profile, setProfile] = useState({})
    const [loggedInUser, setLoggedInUser] = useState("")
    const [number, setNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [gameOver,setGameOver] = useState(false)
    const [score, setScore] = useState(0);
    const [gameName, setGameName] = useState("")
    const currentGame = currentChallenge.currentChallenge.game
    const maxQuestions = currentChallenge.currentChallenge.game.length;

    console.log(currentChallenge)

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)

                if(profile.role !== "PREMIUM"){
                    navigate("/trivia/home")
                }

            } catch (e) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])

    const handleNextQuestion = (isCorrect) => {
        const nextQuestion = number + 1
        if(nextQuestion < maxQuestions) {
            if (isCorrect === currentGame[number].correct_answer) {
                setScore(score + 1);
            }
            setNumber(number + 1);
        } else {

            if (number + 1 === maxQuestions) {
                setGameOver(true)
            }
        }

    };

    useEffect(() => {
        setAnswers([
            ...currentGame[number].incorrect_answers,
            currentGame[number].correct_answer,
        ]);
    }, [number]);


    const handleQuitGame = () => {

        if(profile._id === currentChallenge.currentChallenge.userOne) {

            const updatedChallenge = {
                userOneScore: score
            }
            challengeService.updateChallenge(currentChallenge.currentChallenge.challengeId,updatedChallenge)
        }
        else{
            const updatedChallenge = {
                userTwoScore: score
            }
            challengeService.updateChallenge(currentChallenge.currentChallenge.challengeId,updatedChallenge)
        }
        console.log("kljkjj")
        navigate("/profile")
    }

    return (
        <div>
            {gameOver ? (
                <div className="">
                    <h2 className= "game-over">Game Over!</h2>
                    <p className="score">
                        Your score is {score} out of {maxQuestions}
                    </p>

                    {/*<button className="save-button" onClick={handleSaveGame}>Save</button>*/}
                    <button  className="quit-button" onClick={handleQuitGame}>Exit</button>
                </div>
            ) : (
                <>
                    <h1 className="signup">Welcome to Battle</h1>
                    <div className="game-container">
                        <div className="game-score">Score:{score}</div>
                        <div className="game-question" >
                            Question {number + 1} / {maxQuestions}{" "}
                        </div>

                        <div className="game-question">
                            {decode(currentGame[number].question)}
                        </div>

                        <div>
                            {answers.map((answer) => {
                                return (
                                    <button
                                        className="game-button"
                                        onClick={() => handleNextQuestion(answer)}
                                    >
                                        {decode(answer)}
                                    </button>
                                );
                            })}{" "}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default Battle;