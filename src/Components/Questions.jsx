import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const Questions = () => {
  const [questions, setQuestions] = useState([
    { Title: "", Option1: "", Option2: "", Option3: "", Option4: "", CorrectAnswer: "" }
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { Title: "", Option1: "", Option2: "", Option3: "", Option4: "", CorrectAnswer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/v1/questions`, { questions });
      alert("Questions added successfully!");
      setQuestions([{ Title: "", Option1: "", Option2: "", Option3: "", Option4: "", CorrectAnswer: "" }]);
    } catch (error) {
      console.error("Error adding questions:", error);
    }
  };

  return (
    <div className="p-8 text-white bg-transparent min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Manage Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="p-6 bg-transparent shadow-lg rounded-lg space-y-4">
            <input
              type="text"
              name="Title"
              value={question.Title}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter question title"
              className="w-full p-3 border bg-transparent border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="Option1"
              value={question.Option1}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter option 1"
              className="w-full p-3 bg-transparent border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="Option2"
              value={question.Option2}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter option 2"
              className="w-full p-3 bg-transparent border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="Option3"
              value={question.Option3}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter option 3"
              className="w-full p-3 bg-transparent border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="Option4"
              value={question.Option4}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter option 4"
              className="w-full p-3 bg-transparent border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="CorrectAnswer"
              value={question.CorrectAnswer}
              onChange={(event) => handleInputChange(index, event)}
              required
              placeholder="Enter correct answer"
              className="w-full p-3 bg-transparent border border-gray-300 outline-none rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <FaTrash className="mr-1" /> Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
          >
            <FaPlus className="mr-2" /> Add Question
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
          >
            Submit Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default Questions;
