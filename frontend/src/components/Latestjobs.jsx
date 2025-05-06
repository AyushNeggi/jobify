import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Latestjob = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="  text-4xl font-bold  ">
        <span className="text-[#7658ef] ">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1  my-5 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs.length <= 0 ? (
          <div className="mx-auto my-10">
            <span className="p-4 text-center  border-b-4 border-indigo-500 font-medium text-[16px] shadow-lg ">Currently no job is available at this moment </span>
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default Latestjob;
