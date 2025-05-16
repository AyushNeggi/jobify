import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Star, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-[#daeae6]  sticky top-0 p-4 z-50">
      <div className="  flex items-center justify-between mx-auto max-w-8xl h-20">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-4xl mx-16 font-bold text-[#660e60] ">Jobify</h1>
        </div>
        <div className="flex items-center gap-12 ">
          <ul className="flex font-medium items-center gap-5">
            {user?.role === "recruiter" ? (
              location.pathname !== "/admin/home" ? (
                <>
                  <li>
                    <Link to="/admin/home">
                      <Button className="bg-[#D96281] hover:bg-[#F294AD] px-4 py-2 w-28 text-center font-medium ">Home</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/companies">
                      <Button className="bg-[#D96281] hover:bg-[#F294AD] px-4 py-2 w-28 text-center font-medium ">Companies</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">
                      <Button className="bg-[#D96281] hover:bg-[#F294AD] px-4 py-2 w-28 text-center font-medium ">Jobs</Button>
                    </Link>
                  </li>
                </>
              ) : null
            ) : (
              <>
                <div className="flex justify-normal gap-2 bg-[] ">
                  <li>
                    <Link to="/">
                      <Button className="bg-[#88B6F2] hover:bg-[#9BC1F2] p-2 w-16 ">Home</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs">
                      <Button className="bg-[#88B6F2] hover:bg-[#9BC1F2] p-2 w-16 ">jobs</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse">
                      <Button className="bg-[#88B6F2] hover:bg-[#9BC1F2] p-2 w-16 ">browse</Button>
                    </Link>
                  </li>
                </div>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 p-4 ">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0468BF] hover:bg-[#049DD9]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-20 w-20 my-auto align-right  ">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="relative w-80 mr-4 border-2 border-indigo-400 rounded-lg shadow-md">
                {/* Admin badge in top-right */}
                {user?.role === "recruiter" && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-sm font-semibold text-white bg-[#0468BF] px-2 py-1 rounded-full shadow-sm">
                    <Star className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                )}

                <div className="">
                  <div className="flex items-center gap-4 mb-4 ">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-lg leading-tight">{user?.fullname?.charAt(0).toUpperCase() + user?.fullname?.slice(1)}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio || ""}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    {user?.role === "student" && (
                      <Button
                        asChild
                        variant="ghost"
                        className="flex items-center gap-2 w-1/2 justify-start py-2.5 px-4 bg-[#e0f7fa] rounded-md hover:bg-[#d0f0f5] border-[2.2px] border-black"
                      >
                        <Link to="/profile">
                          <User2 className="h-5 w-5" />
                          <span>Profile</span>
                        </Link>
                      </Button>
                    )}

                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="flex items-center gap-2 w-1/2 justify-start bg-[#e0f7fa] hover:bg-[#d0f0f5]"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
