import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currenTime = new Date();
    const timeDifference = currenTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="px-6 py-2 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between min-h-[260px]">
      {/* Date posted */}
      <div className="text-xs text-gray-400  text-right">
        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} day(s) ago`}
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-12 h-12 border">
          <AvatarImage src={job?.company?.logo || "https://via.placeholder.com/40"} alt="Company Logo" />
        </Avatar>
        <div>
          <h2 className="text-md font-semibold truncate">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="mb-3">
        <h1 className="text-lg font-bold text-gray-800 truncate">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3 h-[2.5rem]">{job?.description}</p>
      </div>

      {/* Tags / Badges */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge className="text-blue-700 font-medium" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 font-medium" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-medium" variant="outline">
          ₹{job?.salary} LPA
        </Badge>
      </div>

      {/* View Details Button */}
      <div className="mt-auto">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="secondary" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  );
};
export default Job;
