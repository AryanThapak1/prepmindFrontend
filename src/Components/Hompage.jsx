import { useNavigate } from "react-router-dom";
import Footer from "../utils/Footer";
import jobImage from "./../Items/Job.png";
import secondImage from "./../Items/Job2.png";

const HomePage = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">
            Welcome to Your Career Hub
          </h1>
          <p className="text-lg mb-6 text-white">
            Unlock your potential with our AI-based resume creation tool and TCS NQT-based quizzes. Our platform is designed to help you create professional resumes effortlessly and prepare for TCS NQT with confidence.
          </p>
          <p className="text-lg text-white">
            Whether you're crafting your first resume or looking to improve your score on TCS NQT, our user-friendly tools and resources are here to support your career journey.
          </p>
        </div>
        <div className="w-7/12">
          <img
            src={jobImage}
            alt="Resume Creation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-8/12">
          <img
            src={secondImage}
            alt="Quiz Preparation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-green-700">
            Prepare for Success
          </h1>
          <p className="text-lg mb-6 text-white">
            Our AI-based resume builder helps you create resumes that stand out to potential employers. With tailored templates and expert advice, you can showcase your skills and experiences effectively.
          </p>
          <p className="text-lg text-white">
            Take our TCS NQT-based quizzes to assess and enhance your knowledge. Our comprehensive question bank covers all key areas, ensuring you're well-prepared for the test.
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClickHandler}
        >
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
