import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/Constant';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/quiz`); // Adjust this URL based on your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch quizzes');
                }
                const data = await response.json();
                setQuizzes(data.data.quizzes); // Assuming the response structure is { data: { quizzes: [...] } }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading quizzes...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700">Available Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {quizzes.map(quiz => (
                    <div key={quiz._id} className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">{quiz.quizId}</h3>
                            <p className="mt-2 text-gray-600">Click below to start the quiz</p>
                            <Link
                                to={`/quiz/${quiz._id}`}
                                className="mt-4 block text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Start Quiz
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
