import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="px-6 py-4 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between min-h-[200px]"
    >
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
        <p className="text-sm text-gray-600 line-clamp-2 h-[2.5rem]">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
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
    </div>
  );
};

export default LatestJobCards;
