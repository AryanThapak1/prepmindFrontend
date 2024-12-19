import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../utils/Constant";
const downloadResume = () => {
    const resumeElement = document.getElementById("resume");
    html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Get image properties and scale to fit
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 20; // 10mm padding on each side
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      
      // Ensure it starts from the top of the PDF page
      const marginX = 10;
      const marginY = 0; // Start from the top of the page
  
      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

const Resume = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState();
  const navigate=useNavigate();
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/resume/${id}`);
    const data = await res.json();
    setResumeData(data.resume.resume);
  };

  const editResume=()=>{
    navigate(`/editResume/${id}`)
  }
const deleteResume=async()=>{
  const res=await fetch(`${BASE_URL}/api/v1/resume/${id}`,{
    method:"DELETE"
  })

  if(!res.ok){
    return;
  }

  navigate("/Resume")

}

  useEffect(() => {
    fetchData();
  }, []);

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between">
      <button
        onClick={downloadResume}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download Resume
      </button>
      
      <button className="mb-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700" onClick={editResume}>
        Edit Resume
      </button>

      <button className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={deleteResume}>
        Delete Resume
      </button>
      </div>
      
      <div
        id="resume"
        className="max-w-4xl mx-auto p-4 bg-white shadow-md"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-1">{resumeData.Name}</h1>
          <p className="text-lg">
            Phone: {resumeData.Mobile_No} | Email: {resumeData.Address}
          </p>
          <p className="text-lg">
            LinkedIn:{" "}
            <a
              href={`https://${resumeData.LinkedIn_url}`}
              className="text-blue-500"
            >
              {resumeData.LinkedIn_url}
            </a>{" "}
            | Github:{" "}
            <a
              href={`https://github.com/${resumeData.github_url}`}
              className="text-blue-500"
            >
              {resumeData.github_url}
            </a>
          </p>
        </header>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">EDUCATION</h2>
          <div className="bg-white p-2 shadow rounded">
            <h3 className="text-lg font-semibold">
              {resumeData.Education.College.CourseName}, CGPA:{" "}
              {resumeData.Education.College.CGPA}
            </h3>
            <p>
              {resumeData.Education.College.College_Name} |{" "}
              {new Date(resumeData.Education.College.SessionStart).getFullYear()} -{" "}
              {new Date(resumeData.Education.College.SessionEnd).getFullYear()}
            </p>
          </div>
          <div className="bg-white p-2 shadow rounded mt-2">
            <h3 className="text-lg font-semibold">
              {resumeData.Education.School.CourseName}, Percentage:{" "}
              {resumeData.Education.School.Percentage}
            </h3>
            <p>
              {resumeData.Education.School.School_Name} |{" "}
              {new Date(resumeData.Education.School.SessionStart).getFullYear()} -{" "}
              {new Date(resumeData.Education.School.SessionEnd).getFullYear()}
            </p>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">SKILLS</h2>
          <div className="bg-white p-2 shadow rounded">
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <ul className="list-disc list-inside ml-4">
              <li>
                Programming Languages:{" "}
                {resumeData.Skills.Technical_Skills.Programming_Languages.join(", ")}
              </li>
              <li>
                Technologies:{" "}
                {resumeData.Skills.Technical_Skills.Technologies.join(", ")}
              </li>
              <li>
                Operating System:{" "}
                {resumeData.Skills.Technical_Skills.Operating_System.join(", ")}
              </li>
              <li>
                Database:{" "}
                {resumeData.Skills.Technical_Skills.Database.join(", ")}
              </li>
              <li>
                Tools: {resumeData.Skills.Technical_Skills.Tools.join(", ")}
              </li>
              <li>
                Libraries:{" "}
                {resumeData.Skills.Technical_Skills.Libraries.join(", ")}
              </li>
            </ul>
          </div>
          <div className="bg-white p-2 shadow rounded mt-2">
            <h3 className="text-lg font-semibold">Soft Skills</h3>
            <ul className="list-disc list-inside ml-4">
              {resumeData.Skills.Soft_Skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">PROJECTS</h2>
          {resumeData.Projects.map((project, index) => (
            <div key={index} className="bg-white p-2 shadow rounded mb-2">
              <h3 className="text-lg font-semibold">{project.Project_Name}</h3>
              <ul className="list-disc list-inside ml-4">
                {project.Description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">SCORES AND CERTIFICATIONS</h2>
          <ul className="list-disc list-inside ml-4 bg-white p-2 shadow rounded">
            {resumeData.Scores_And_Certifications.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2">AWARDS AND ACCOMPLISHMENTS</h2>
          <ul className="list-disc list-inside ml-4 bg-white p-2 shadow rounded">
            {resumeData.Awards_And_Accomplishments.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Resume;
