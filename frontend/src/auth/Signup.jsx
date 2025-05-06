import Navbar from "@/components/shared/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import React, { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "@/components/shared/Footer";

const Signup = () => {
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {   //sending data on backend
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // ✅ Update Redux with user info
        toast.success(res.data.message);
        navigate("/"); // ✅ Redirect after successful login
      }
      
    } catch (error) {
      console.log("Full error object:", error);

      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <div className="max-w-7xl mx-auto  flex-grow  ">
        <div className="flex items-center justify-center   p-4 ">
          <form onSubmit={submitHandler} className="w-128 border border-gray-200 p-4 rounded-md bg-[#ECBDF2]">
            <h1 className=" flex items-center ] justify-center font-semibold  text-[20px] mb-3">Signup to continue</h1>

            <div className="my-4">
              <Label>Full name </Label>
              <Input
                className="mt-1 mb-1 border p-1"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder=" name "
              />
              <Label>Email </Label>
              <Input className="mt-1 mb-1" type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder=" mail " />
              <Label>Phone Number </Label>
              <Input
                className="mt-1 mb-1"
                type="number"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder=" phoneNumber "
              />
              <Label>Password </Label>
              <Input
                className="mt-1 mb-1"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder=" password "
              />
            </div>

            <div className="flec items-center justify-center">
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
              </div>
            </div>

            {loading ? (
              <Button className="w-full my-4">
               
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait 
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#0468BF] hover:bg-[#0477BF]">
                signup
              </Button>
            )}

            <span className="text-sm">
              Already have an account? 
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
