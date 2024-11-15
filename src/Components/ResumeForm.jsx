import React, { useRef, useState } from "react";
import BASE_URL from "../utils/Constant";
import { useNavigate } from "react-router-dom";
import Prompt from "../utils/Prompt";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ResumeForm = () => {
  const token = sessionStorage.getItem("token");
  const nameRef = useRef();
  const addressRef = useRef();
  const mobileRef = useRef();
  const linkedInRef = useRef();
  const githubRef = useRef();
  const collegeNameRef = useRef();
  const CGPARef = useRef();
  const courseNameRef = useRef();
  const csessionStartRef = useRef();
  const csessionEndRef = useRef();
  const schoolNameRef = useRef();
  const percentageRef = useRef();
  const schoolCourseNameRef = useRef();
  const ssessionStartRef = useRef();
  const ssessionEndRef = useRef();
  const programmingLanguageRef = useRef();
  const technologiesRef = useRef();
  const osRef = useRef();
  const dbRef = useRef();
  const toolsRef = useRef();
  const librariesRef = useRef();
  const softSkillsRef = useRef();
  const scoreRef = useRef();
  const awardsRef = useRef();
  const [Projects, setProjects] = useState([
    { Project_Name: "", Description: "" },
  ]);
  const navigate = useNavigate();

  const onAddProjectHandler = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { Project_Name: "", Description: "" },
    ]);
  };

  const onProjectChangeHandler = (index, field, value) => {
    const updatedProjects = [...Projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const resume = {
      Name: nameRef.current.value,
      Address: addressRef.current.value,
      Mobile_No: mobileRef.current.value,
      LinkedIn_url: linkedInRef.current.value,
      github_url: githubRef.current.value,
      Education: {
        College: {
          College_Name: collegeNameRef.current.value,
          CGPA: CGPARef.current.value,
          CourseName: courseNameRef.current.value,
          SessionStart: csessionStartRef.current.value,
          SessionEnd: csessionEndRef.current.value,
        },
        School: {
          School_Name: schoolNameRef.current.value,
          Percentage: percentageRef.current.value,
          CourseName: schoolCourseNameRef.current.value,
          SessionStart: ssessionStartRef.current.value,
          SessionEnd: ssessionEndRef.current.value,
        },
      },
      Skills: {
        Technical_Skills: {
          Programming_Languages:
            programmingLanguageRef.current.value.split(","),
          Technologies: technologiesRef.current.value.split(","),
          Operating_System: osRef.current.value.split(","),
          Database: dbRef.current.value.split(","),
          Tools: toolsRef.current.value.split(","),
          Libraries: librariesRef.current.value.split(","),
        },
        Soft_Skills: softSkillsRef.current.value.split(","),
      },
      Scores_And_Certifications: scoreRef.current.value.split("."),
      Awards_And_Accomplishments: awardsRef.current.value.split("."),
      Projects,
    };

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const resJson = JSON.stringify(resume);
    const prompt = Prompt(resJson);
    console.log(prompt);
    const result = await model.generateContent(prompt);

    console.log(result.response.text().replace(/```json|```/g, ""));

    const rawResponseText = await result.response.text();
    // Remove any surrounding ```json or ``` from the response
    const cleanResponseText = rawResponseText
      .replace(/```json|```/g, "")
      .trim();
    // Parse the clean JSON string to an object
    const newResume = JSON.parse(cleanResponseText);
    const res = await fetch(`${BASE_URL}/api/v1/resume`, {
      method: "POST",
      body: JSON.stringify({ resume: newResume }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setTimeout(() => {
        navigate("/resume");
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Resume Form
      </h2>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={addressRef}
            placeholder="Address"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={mobileRef}
            placeholder="Mobile No"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="url"
            ref={linkedInRef}
            placeholder="LinkedIn URL"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="url"
            ref={githubRef}
            placeholder="GitHub URL"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">
            Education
          </h3>
          <input
            type="text"
            ref={collegeNameRef}
            placeholder="College Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            ref={CGPARef}
            placeholder="CGPA"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={courseNameRef}
            placeholder="Course Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="flex space-x-4">
            <input
              type="date"
              ref={csessionStartRef}
              className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              ref={csessionEndRef}
              className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <input
            type="text"
            ref={schoolNameRef}
            placeholder="School Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={percentageRef}
            placeholder="Percentage"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={schoolCourseNameRef}
            placeholder="Course Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="flex space-x-4">
            <input
              type="date"
              ref={ssessionStartRef}
              className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              ref={ssessionEndRef}
              className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mt-8">
            Technical Skills
          </h3>
          <input
            type="text"
            ref={programmingLanguageRef}
            placeholder="Programming Languages"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={technologiesRef}
            placeholder="Technologies"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={osRef}
            placeholder="Operating Systems"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={dbRef}
            placeholder="Databases"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={toolsRef}
            placeholder="Tools"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={librariesRef}
            placeholder="Libraries"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">
            Soft Skills
          </h3>
          <input
            type="text"
            ref={softSkillsRef}
            placeholder="Soft Skills"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Projects</h3>
          {Projects.map((project, index) => (
            <div
              key={index}
              className="space-y-2 bg-white p-4 border rounded-lg shadow-md"
            >
              <input
                type="text"
                placeholder="Project Name"
                value={project.Project_Name}
                onChange={(e) =>
                  onProjectChangeHandler(index, "Project_Name", e.target.value)
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Project Description"
                value={project.Description}
                onChange={(e) =>
                  onProjectChangeHandler(index, "Description", e.target.value)
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={onAddProjectHandler}
            className="mt-2 bg-indigo-600 text-white w-full p-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Project
          </button>

          <h3 className="text-xl font-semibold text-gray-700 mt-8">
            Scores & Certifications
          </h3>
          <input
            type="text"
            ref={scoreRef}
            placeholder="Scores & Certifications"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">
            Awards & Accomplishments
          </h3>
          <input
            type="text"
            ref={awardsRef}
            placeholder="Awards & Accomplishments"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md mt-6 hover:bg-green-700 transition-colors"
          >
            Generate Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
