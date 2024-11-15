import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../utils/Constant";

// Resume Component to display existing resumes and provide a create option
const Resume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching all resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/v1/resume`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch resumes");
        }
        const data = await response.json();
        setResumes(data.data.resumes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-white">My Resumes</h1>

      {/* Error handling */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Loading state */}
      {loading ? (
        <p className="text-white">Loading resumes...</p>
      ) : (
        <>
          {resumes.length === 0 ? (
            <p className="text-white">No resumes found. Please create one.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {resumes.map((resume) => (
                <div key={resume._id} className="border p-4 rounded-md shadow-md bg-transparent">
                  <h2 className="font-semibold text-lg text-white">{resume.Name}</h2>
                  <p className="text-gray-200">{resume.Address}</p>
                  <p className="text-gray-200">Mobile: {resume.Mobile_No}</p>
                  <Link to={`/resume/${resume._id}`} className="text-indigo-600 hover:text-indigo-500">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Button to create new resume */}
      <Link
        to="/create-resume"
        className="mt-6 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded"
      >
        Create New Resume
      </Link>
    </div>
  );
};

export default Resume;
