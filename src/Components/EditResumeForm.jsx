import React, { useEffect, useRef, useState } from "react";
import BASE_URL from "../utils/Constant";
import { useNavigate, useParams } from "react-router-dom";
import Prompt from "../utils/Prompt";

const ResumeForm = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

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
  const { id } = useParams();
  const [projects, setProjects] = useState([{ Project_Name: "", Description: "" }]);

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/Resume/${id}`);
    const data = await res.json();
    const resume = data.resume.resume;

    nameRef.current.value = resume.Name;
    addressRef.current.value = resume.Address;
    mobileRef.current.value = resume.Mobile_No;
    linkedInRef.current.value = resume.LinkedIn_url;
    githubRef.current.value = resume.github_url;
    collegeNameRef.current.value = resume.Education.College.College_Name;
    CGPARef.current.value = resume.Education.College.CGPA;
    courseNameRef.current.value = resume.Education.College.CourseName;
    csessionStartRef.current.value = resume.Education.College.SessionStart.split('T')[0];
    csessionEndRef.current.value = resume.Education.College.SessionEnd.split('T')[0];
    schoolNameRef.current.value = resume.Education.School.School_Name;
    percentageRef.current.value = resume.Education.School.Percentage;
    schoolCourseNameRef.current.value = resume.Education.School.CourseName;
    ssessionStartRef.current.value = resume.Education.School.SessionStart.split('T')[0];
    ssessionEndRef.current.value = resume.Education.School.SessionEnd.split('T')[0];
    programmingLanguageRef.current.value = resume.Skills.Technical_Skills.Programming_Languages.join(',');
    technologiesRef.current.value = resume.Skills.Technical_Skills.Technologies.join(',');
    osRef.current.value = resume.Skills.Technical_Skills.Operating_System.join(',');
    dbRef.current.value = resume.Skills.Technical_Skills.Database.join(',');
    toolsRef.current.value = resume.Skills.Technical_Skills.Tools.join(',');
    librariesRef.current.value = resume.Skills.Technical_Skills.Libraries.join(',');
    softSkillsRef.current.value = resume.Skills.Soft_Skills.join(',');
    scoreRef.current.value = resume.Scores_And_Certifications.join('.');
    awardsRef.current.value = resume.Awards_And_Accomplishments.join('.');

    setProjects(resume.Projects.map(project => ({
      Project_Name: project.Project_Name,
      Description: project.Description.join(' ')
    })));
  };

  const onAddProjectHandler = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { Project_Name: "", Description: "" },
    ]);
  };

  const onProjectChangeHandler = (index, field, value) => {
    const updatedProjects = [...projects];
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
          Programming_Languages: programmingLanguageRef.current.value.split(","),
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
      Projects: projects,
    };

    console.log(resume);
    const res = await fetch(`${BASE_URL}/api/v1/resume/:${id}`, {
      method: "PUT",
      body: JSON.stringify({ resume }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setTimeout(() => {
        navigate("/resume");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Edit Resume Form
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

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Education</h3>
          <input
            type="text"
            ref={collegeNameRef}
            placeholder="College Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
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
            placeholder="Percentage in %"
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

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Technical Skills</h3>
          <input
            type="text"
            ref={programmingLanguageRef}
            placeholder="Programming Languages (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={technologiesRef}
            placeholder="Technologies (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={osRef}
            placeholder="Operating Systems (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={dbRef}
            placeholder="Databases (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={toolsRef}
            placeholder="Tools (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            ref={librariesRef}
            placeholder="Libraries (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Soft Skills</h3>
          <input
            type="text"
            ref={softSkillsRef}
            placeholder="Soft Skills (comma separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Scores and Certifications</h3>
          <textarea
            ref={scoreRef}
            placeholder="Scores and Certifications (dot separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Awards and Accomplishments</h3>
          <textarea
            ref={awardsRef}
            placeholder="Awards and Accomplishments (dot separated)"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-8">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Project Name"
                value={project.Project_Name}
                onChange={(e) =>
                  onProjectChangeHandler(index, "Project_Name", e.target.value)
                }
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                placeholder="Description"
                value={project.Description}
                onChange={(e) =>
                  onProjectChangeHandler(index, "Description", e.target.value)
                }
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={onAddProjectHandler}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Add Project
          </button>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
