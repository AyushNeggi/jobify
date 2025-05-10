import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-5">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#591202] font-medium">Let’s help you land your dream career</span>
        <h1 className="text-3xl font-bold text-[#730220]">
          One Platform <br /> <span className="text-[#660e60] text-5xl"> Endless Opportunities</span>
        </h1>
        <p className="font-serif text-[#cfa093]">
          do you want to increase your chance of getting selected Just <span className="text-[#034001] font-semibold">APPLY</span> and get the
          Interview Call{" "}
        </p>

        <div className="mt-8 flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className=" rounded-r-full bg-[#893f71]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
