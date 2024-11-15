// src/components/QuizPlayer.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Question from './../utils/Question';
import BASE_URL from '../utils/Constant';

const QuizPlayer = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const navigate=useNavigate();
    const fetchQuizById = async (quizId) => {
        const res = await fetch(`${BASE_URL}/api/v1/quiz/${quizId}`);
        const data = await res.json();
        return data.data.quiz;
    };

    useEffect(() => {
        const loadQuiz = async () => {
            const quizData = await fetchQuizById(quizId);
            setQuiz(quizData);
        };
        loadQuiz();
    }, [quizId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        const token = sessionStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

        const calculatedScore = quiz.questions.reduce((acc, question) => {
            return answers[question._id] === question.CorrectAnswer ? acc + 1 : acc;
        }, 0);

        const res = await fetch(`${BASE_URL}/api/v1/quiz/submit`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: { quizID: quiz.quizId, Score: calculatedScore,total:quiz.questions.length }
            }),
        });
        
        const result = await res.json();
        setScore(result.data.result.results.slice(-1)[0].Score);

        setTimeout(()=>{
            navigate("/Analytics");
        },3000)
    };

    if (!quiz) return <p className="text-center text-xl mt-10">Loading...</p>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="container mx-auto p-6 max-w-lg bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700">{quiz.quizId}</h2>
            <Question
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion._id]}
                onAnswerChange={handleAnswerChange}
            />
            <div className="flex justify-between mt-6">
                {currentQuestionIndex > 0 && (
                    <button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition text-gray-700 font-semibold"
                    >
                        Previous
                    </button>
                )}
                <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
            {score !== null && (
                <div className="mt-8 text-center">
                    <h3 className="text-2xl font-bold text-blue-700">Your Score: {score}</h3>
                </div>
            )}
        </div>
    );
};

export default QuizPlayer;
