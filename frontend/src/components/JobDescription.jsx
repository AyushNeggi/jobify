import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

export const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const isIntiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true); //update local state
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }; //updating applied user in application
        dispatch(setSingleJob(updatedSingleJob)); //helps us to ui update in real time
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?.id)); //ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="my-10 mx-40 border-4 border-double border-indigo-400 p-4 shadow-sky-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-shadow-red-400">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold text-[12px]"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-[#F83002] font-bold text-[12px]"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209b7] font-bold text-[12px]"} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          {
            user && 
            <Button
            onClick={isIntiallyApplied ? null : applyJobHandler}
            disabled={isIntiallyApplied}
            className={`rounded-lg ${isIntiallyApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#2e86c1] hover:bg-[#21618c]"}`}
          >
            {isIntiallyApplied ? " Already applied" : "Apply Now"}
          </Button>
          }
          
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium my-4 py-1">Job description</h1>

        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}+ yrs</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
