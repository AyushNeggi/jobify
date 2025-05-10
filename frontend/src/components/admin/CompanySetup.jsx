import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const selectChangeHandler = (field, value) => {
    setInput({ ...input, [field]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // typically we don’t set a file from existing data, unless you have a URL or something
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 border p-5">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold  bg-[#9BC1F2] ">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl mx-auto border-b-2 border-gray-200 p-4 bg-[#FEE6E6]">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-[10px]">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
              <Label className="block mb-[10px]">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label className="block mt-[10px]">Website</Label>
              <Input className="mt-2" type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>

            <div>
              <h1 className=" block font-medium mb-[6px] ">Location</h1>
              <Select  onValueChange={(value) => selectChangeHandler("location", value)}>
                <SelectTrigger className="w-[184px]">
                  <SelectValue placeholder="Select Company Location"  />
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

          </div>
          <div>


<Label  className=" my-[10px] flex flex-col font-medium">Logo</Label>
<Input className="w-fit" type="file" accept="image/*" onChange={changeFileHandler} />

</div>

             
          {loading ? (
            <Button className="w-full my-8">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-8 bg-[#0477BF]">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
