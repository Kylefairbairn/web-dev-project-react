import mockData from "./mock-data.json";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import "./mock-game.css"

const PlayGameMock = () => {
    const [number, setNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore,setShowScore] = useState(false)
    const [score, setScore] = useState(0);

    const maxQuestions = mockData.results.length;

    const handleNextQuestion = (isCorrect) => {
        const nextQuestion = number + 1
        if(nextQuestion < maxQuestions) {
            if (isCorrect === mockData.results[number].correct_answer) {
                setScore(score + 1);
            }
            setNumber(number + 1);
        } else {

            if (number + 1 === maxQuestions) {
                setShowScore(true)
            }
        }

    };

    useEffect(() => {
        setAnswers([
            ...mockData.results[number].incorrect_answers,
            mockData.results[number].correct_answer,
        ]);
    }, [number]);

    return (
        <div>
            {showScore ? (
                <div className="score-section-after"> You scored {score} out of {maxQuestions}
                <button className="pop-up-sign-up rounded-pill">Sign Up Now !</button>
                </div>
                ) : (
            <>
            <h1 className="signup">Try a Game before you sign up</h1>
            <div className="game-container">
                <div className="game-score">Score:{score}</div>
                <div className="game-question" >
                    Question {number + 1} / {maxQuestions}{" "}
                </div>

                <div className="game-question">
                    {decode(mockData.results[number].question)}
                </div>

                <div>
                    {answers.map((answer) => {
                        return (
                            <button
                                className="game-button"
                                onClick={() => handleNextQuestion(answer)}
                            >
                                {answer}
                            </button>
                        );
                    })}{" "}
                </div>
            </div>
            </>
                )}
        </div>
    );
};
export default PlayGameMock;
