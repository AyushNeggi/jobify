import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (field, value) => {
    setInput({ ...input, [field]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/createjob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-5xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-3 mx-4">
            <div>
              <span className="font-medium ">Title</span>
              <Select onValueChange={(value) => selectChangeHandler("title", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Software Developer">Software Developer</SelectItem>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                    <SelectItem value="Mern Stack Developer">Mern Stack Developer</SelectItem>
                    <SelectItem value="AI ML Developer">AI-ML Developer</SelectItem>
                    <SelectItem value="Java Developer">Java Developer</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                    <SelectItem value="Web Developer">Web Developer</SelectItem>
                    <SelectItem value="Frontend Developer"> Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                placeholder="about job"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                placeholder="tech - stack"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <span className="font-medium ">Salary</span>
              <Select onValueChange={(value) => selectChangeHandler("salary", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="Select Salary " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="3">3 LPA </SelectItem>
                    <SelectItem value="5">5 LPA </SelectItem>
                    <SelectItem value="7">7 LPA </SelectItem>
                    <SelectItem value="9">9 LPA </SelectItem>
                    <SelectItem value="13">12+ LPA </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span className="font-medium ">Location</span>
              <Select onValueChange={(value) => selectChangeHandler("location", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="Select Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mohali">Mohali</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span className="font-medium">Job Type</span>
              <Select className="mx-3" onValueChange={(value) => selectChangeHandler("jobType", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="FullTime">FullTime</SelectItem>
                    <SelectItem value="PartTime">PartTime</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span className="font-medium ">Experience</span>
              <Select onValueChange={(value) => selectChangeHandler("experience", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="select experience " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">Fresher</SelectItem>
                    <SelectItem value="1">1+ years</SelectItem>
                    <SelectItem value="3">3+ years</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                    <SelectItem value="10">10+ years</SelectItem>
                    <SelectItem value="20">20+ years</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={(value) => selectChangeHandler("companyId", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return <SelectItem value={company._id}>{company.name}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">*Please register a company first, before posting a jobs</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
