import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const LatestJobCards = ({ job }) => {
  
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-8 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer flex flex-col "
    >
      <div>
        <div className="flex flex-row gap-5">
          <Button variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex  items-center gap-2 pt-4 mt-auto">
        <Badge className={"text-blue-700 font-bold text-[14px] p-2"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#d83333] font-bold text-[14px] p-2  "} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold text-[14px] p-2  "} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
