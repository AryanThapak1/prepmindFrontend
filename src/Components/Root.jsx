import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import bg from "./../Items/bg.jpeg";
const Root = () => {
  return (
    <div className="bg-hero-pattern bg-cover min-h-screen">
      <>
        <Navigation />
        <Outlet />
      </>
    </div>
  );
};

export default Root;
