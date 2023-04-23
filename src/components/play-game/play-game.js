import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {createGame, saveCurrentGame, saveGame, updateGameProfile} from "../../services/create-game-service";
import { decode } from "html-entities";
import { PacmanLoader } from "react-spinners";
import "./play-game.css";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import * as gameService from "../../services/create-game-service";

const PlayGame = () => {
    const navigate = useNavigate();
    const currentGame = useSelector((state) => state.game.currentGame);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answerIndex, setAnswerIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questionLength, setQuestionLength] = useState(0);
    const [game, setGame] = useState({});
    const [error, setError] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [profile, setProfile] = useState({});
    const [saveGame, setSaveGame] = useState({})
    const [gameCopy, setGameCopy] = useState({})
    const [gameName, setGameName] = useState("")
    const [category, setCategory] = useState("")
    const [points, setPoints] = useState(0)


    useEffect(() => {
        async function fetchData() {
            const response = await createGame(
                currentGame.question_amount,
                currentGame.question_category,
                currentGame.question_difficulty,
                currentGame.question_type
            );

            if (response.response_code === 1) {
                setError("An error has occurred while creating the game");
                setLoading(false);
            } else {
                setLoading(false);
                setQuestionLength(response.results.length);
                setGame([...response.results, response.results]);
                setGameCopy(response.results)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (game?.length) {
            setAnswers([
                ...game[answerIndex].incorrect_answers,
                game[answerIndex].correct_answer,
            ]);
        }
    }, [game, answerIndex]);

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)
            } catch (e) {
                //navigate('/signup')
            }
        }
        fetchData()

    }, [navigate])

    useEffect(() => {

    }, [saveGame]);

    const handleSaveGame = async () => {
        if (profile === {}) {
            console.log("empty profile")
        } else {
            const newSaveGame = {
                user: profile._id,
                score: score,
                totalQuestions: questionLength,
                category: category,
                game: gameCopy,
                name: gameName,
                points: points,
                username: profile.username
            };
            setSaveGame(newSaveGame);
            await gameService.saveCurrentGame(newSaveGame)
            const userProfile = await gameService.getProfileData(profile._id);
            console.log(userProfile);

            const categoryIndex = userProfile.category.findIndex(
                (cat) => cat.category === category
            );
            const categoryCounts = userProfile.categoryCounts || {};
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;

            await gameService.updateGameProfile(userProfile._id, {
                score: userProfile.score + score,
                points: userProfile.points + points,
                gamesPlayed: userProfile.gamesPlayed + 1,
                gamesWon: score === questionLength ? userProfile.gamesWon + 1 : userProfile.gamesWon,
                totalQuestions: userProfile.totalQuestions + questionLength,
                category: categoryIndex >= 0 ? [
                    ...userProfile.category.slice(0, categoryIndex),
                    { category: category, freq: userProfile.category[categoryIndex].freq + 1 },
                    ...userProfile.category.slice(categoryIndex + 1)
                ] : [
                    ...userProfile.category,
                    { category: category, freq: 1 }
                ],
                categoryCounts: categoryCounts
            });

            navigate("home")
        }
    }

    const handleNextQuestion = (isCorrect) => {
        if (isCorrect === game[number].correct_answer) {
            setScore(score + 1);
            setPoints(points + 10)
        }

        if (number + 1 === questionLength) {
            setGameOver(true);
        } else {
            setCategory(game[0].category)
            setNumber(number + 1);
            setAnswerIndex(answerIndex + 1);

        }
    };

    const handleQuitGame = () => {
        navigate("/profile")
    }

    const handleNameGame = () => {
        console.log(gameName)
    }

    return (
        <div className="game-container">
            {loading ? (
                <PacmanLoader color={"purple"} loading={loading} size={150} />
            ) : error ? (
                <div className="game-error">{error}</div>
            ) : gameOver ? (
                <div className="">
                    <h2 className= "game-over">Game Over!</h2>
                    <p className="score">
                        Your score is {score} out of {questionLength}
                    </p>
                    <label className="score-label">Name your game</label>
                        <input className="score-input" onChange={(e) =>
                            setGameName(e.target.value)}>
                        </input>
                    <button className="save-button" onClick={handleSaveGame}>Save</button>
                    <button  className="quit-button" onClick={handleQuitGame}>Exit</button>
                </div>
            ) : (
                <>
                    <h1 className="game-title">Trivia Game</h1>
                    <div className="game-score">Score: {score}</div>
                    <div className="game-info">
                        Question {number + 1} / {questionLength}
                    </div>
                    {game[number] && answers.length ? (
                        <>
                            <div className="game-question">
                                {decode(game[number].question)}
                            </div>
                            <div className="game-buttons">
                                {answers.map((answer) => {
                                    return (
                                        <button
                                            className="game-button"
                                            onClick={() => handleNextQuestion(answer)}
                                            key={answer}
                                        >
                                            {decode(answer)}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    ) : null}
                </>
            )}

            {/*<pre>*/}
            {/*    {JSON.stringify(saveGame)}*/}
            {/*</pre>*/}

        </div>
    );

}
export default PlayGame;
