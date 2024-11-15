// src/utils/Question.js
import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerChange }) => {
    if (!question) return null; // Return null if question is undefined to avoid errors

    const { Title, Option1, Option2, Option3, Option4 } = question;

    return (
        <div className="question-container bg-white shadow-md rounded-lg p-6 mb-6 transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-5 text-gray-800">{Title}</h3>
            <div className="options space-y-4">
                {[Option1, Option2, Option3, Option4].map((option, index) => (
                    <label
                        key={index}
                        className={`flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer transition
                        ${
                            selectedAnswer === option
                                ? 'bg-blue-100 border-blue-500 shadow-md'
                                : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                        <input
                            type="radio"
                            className="form-radio text-blue-600"
                            name={question._id}
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => onAnswerChange(question._id, option)}
                        />
                        <span className="text-lg text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Question;
