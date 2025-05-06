import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Link } from "react-router-dom";

const Profile = () => {
  useGetAppliedJobs();

  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false); // for editing profile

  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-400 rounded-2xl my-8 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl mb-1">{user?.fullname.charAt(0).toUpperCase() + user?.fullname.slice(1)}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 ">
            <Button onClick={() => setOpen(true)} className="text-right w-fit" variant="outline">
              <Pen />
            </Button>

            <div className="">
              <Button className="bg-indigo-400">
                <Link to="/appliedjobs">
                  <span>Your Applications</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className=" flex my-5 items-center gap-8 border-2 p-2 w-fit">
          <Button className="bg-white border-2 border-indigo-600 hover:bg-indigo-50">
            <h1 className="text-[20px] text-black font-semibold ">Skills</h1>
          </Button>
          <div className="gap-4  flex items-center">
            {user?.profile.skills.length != 0 ? (
              user?.profile.skills.map((item, index) => (
                <Badge className="text-[16px] px-4 rounded-md" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>Na</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4  ">
          <Label className="text-[20px] font-semibold">Resume </Label>
          {isResume ? (
            <a target="blank" href={`${user?.profile?.resume}?fl_attachment=false`} className="text-blue-500 text-[20px] w-full cursor-pointer">
              {user?.fullname.split(" ")[0]}_resume.pdf
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
