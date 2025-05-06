import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="  max-w-7xl mx-auto my-12">
        <div className="flex items-center justify-between my-5 ">
          <Input className="w-fit " placeholder="search here" onChange={(e) => setInput(e.target.value)} />

          <Button className="p-4 bg-[#88B6F2] hover:bg-[#B3CFF2] " onClick={() => navigate("/admin/jobs/create")}>
            Add Jobs{" "}
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
