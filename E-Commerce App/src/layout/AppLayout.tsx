import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const AppLayout = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-4 mb-4 p-4 bg-white shadow-lg rounded-lg">
        {/* This is where the child components will be rendered */}
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
