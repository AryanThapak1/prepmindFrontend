
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import Resume from "./Components/Resume";
import Questions from "./Components/Questions";
import Quiz from "./Components/Quiz";
import Signup, { signupAction } from "./Components/SignUp";
import Login, { loginAction } from "./Components/Login";
import Analytics from "./Components/Analytics";
import Profile from "./Components/Profile";
import CreateResume from "./Components/ResumeForm";
import ResumeFile from "./Components/ResumeFile";
import QuizPlayer from "./Components/QuizPlayer";
import HomePage from "./Components/Hompage";
import {loader as authProtector} from "./utils/authProtection"
import ForgotPassword from "./Components/ForgotPassword";
import EditResumeForm from "./Components/EditResumeForm"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path: "Resume",
          element: <Resume />,
          loader:authProtector
        },
        {
          path: "Questions",
          element: <Questions />,
          loader:authProtector
        },
        {
          path: "Quiz",
          element: <Quiz />,
          loader:authProtector
        },
        {
          path: "SignUp",
          element: <Signup />,
          action: signupAction,
        },
        {
          path: "Login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "Analytics",
          element: <Analytics />,
          loader:authProtector
        },
        {
          path: "Profile",
          element: <Profile />,
          loader:authProtector
        },{
          path:"create-resume",
          element:<CreateResume/>
        },{
          path:"/Quiz/:quizId",
          element:<QuizPlayer/>
        },{
          path:"/Resume/:id",
          element:<ResumeFile/>
        },
        {
          path:"forgot",
          element:<ForgotPassword/>
        },{
          path:"/EditResume/:id",
          element:<EditResumeForm/>
        }
      ],
    },
  ]);  
  
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
