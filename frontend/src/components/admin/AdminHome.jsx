import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <hr className="" />

      <div className="max-w-6xl mx-auto  flex-grow  ">
        <div>
          <Button className="rounded-lg p-10 my-16 text-[20px] font-medium bg-[#E9F2A2] text-red-500 hover:bg-[#b9c17f]">
            <span>Create the beautiful oppertunities for bright minds </span>
          </Button>
        </div>

        <div className="flex gap-8 items-center  ">
          <Link to="/admin/companies">
            <div className="border-2 border-grey-400 my-24 p-4 rounded-lg w-60 text-center font-medium text-[20px] bg-[#B5B4D9] shadow-lg ">
              Registered Companies
            </div>
          </Link>

          <Link to="/admin/jobs">
            <div className="border-2 border-grey-400 my-24 p-4 rounded-lg w-60 text-center font-medium  text-[20px] bg-[#F2D5CE] shadow-lg">
              Current Jobs
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;
