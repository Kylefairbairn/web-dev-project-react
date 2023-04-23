import React, {useEffect, useState} from "react";
import axios from "axios";
import "./create-question.css"
import {isAllOf} from "@reduxjs/toolkit";


const CreateQuestion = () => {

    const [question, setQuestion] = useState("")
    const [listOfQuestions, setListQuestions] = useState([])
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [questionFlag, setQuestionFlag] = useState(false)
    const [incorrectAnswers, setIncorrectAnswers] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        question: '', category: '', tyoe: '', difficulty: '', correct_answer: '', incorrect_answers: ''
    })

    const categoryURL = "https://opentdb.com/api_category.php";

    const difficultyList = ["Easy", "Medium", "Hard"];
    const questionType = ["Multiple Choice", "True/False"];

    const getCategories = async () => {
        const response = await axios.get(categoryURL)
        setCategories(response.data.trivia_categories);

    }

    useEffect(() => {
        getCategories()
    }, []);


    useState(() => {

        const timeid = setTimeout(() => {
            if(questionFlag === true)

                setQuestionFlag(false)

        }, 3000)

        return () => {
            clearTimeout(timeid)
        }

    }, [question,category,type,difficulty,questionFlag, setListQuestions])



    const handleSubmit = () => {
        const newQuestion = {
            question: form.question,
            type: form.tyoe,
            difficulty: form.difficulty,
            correctAnswer: form.correct_answer,
            incorrectAnswers: incorrectAnswers
        }

        console.log(newQuestion)
    }

    const handleAddIncorrectAnswer = () => {
        setIncorrectAnswers([incorrectAnswers,...incorrectAnswers])
        console.log(incorrectAnswers)
    }

    return (
        <div>
        <div className="form-styling">
            <h1>Create a Question </h1>
            <div className="">
                <label>Enter a Question</label>
                <input
                    placeholder="Enter a question"
                    value={form.question}
                    onChange={ (e) => {setForm({...form, question: e.target.value})}}
                />
            </div>

            <div>
                <label>Choose a category</label>

                <select value={form.category} onChange={(e) => {setForm({...form, difficulty: e.target.value})}}>
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
            <div className="select-difficulty mt-2">
                <label>Choose Difficulty</label>

                <select
                    onChange={(e) =>  {setForm({...form, difficulty: e.target.value.toLowerCase()})}}
                    placeholder="easy"
                    value = {form.difficulty}
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
            <div className="mt-2">
                <label>Choose Question Type </label>
                <select value = {form.type} onChange={(e) => {setForm({...form, type: e.target.value})}}>
                    {questionType.map((eachType) => {
                        return (
                            <option key={eachType} value={eachType}>
                                {eachType}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="enter-incorrect-answer" >
                <label className="p-left" >Enter Incorrect Answers</label>
                <input
                    placeholder="Enter An Answer"
                    onChange={(e) =>  {setForm({...form, incorrect_answers: e.target.value})}}
                />
                <button className="button-padding" onClick={handleAddIncorrectAnswer}>Add</button>
            </div>
            <div className="enter-correct-answer" >
                <label className="" >Enter Correct Answer</label>
                <input
                    value={form.correct_answer}
                    placeholder="Enter An Answer"
                    onChange={(e) => {setForm({...form, correct_answer: e.target.value})}}
                />

            </div>
            <button onClick={handleSubmit} className="form-submit-button">Submit</button>
        </div>
         <h1>Incorrect Answers</h1>

            {/*{questionFlag*/}
            {/*    ?*/}
            {/*    question.map((e) => {*/}
            {/*        return (*/}
            {/*            <h1>{e}</h1>*/}
            {/*        )*/}
            {/*    })*/}
            {/*    : ''*/}
            {/*}*/}

        </div>
    );

}
export default CreateQuestion