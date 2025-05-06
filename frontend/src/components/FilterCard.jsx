import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mohali", "Pune", "Bangalore", "Mumbai", "Hyderabad"],
  },
  {
    filterType: "Profile",
    array: [
      "Software Developer",
      "Full Stack Developer",
      "Mern Stack Developer",
      "Java Developer",
      "AI ML Developer",
      "Web Developer",
      "Analyst",
      "Frontend Developer",
      "Backend Developer",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedVAlue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedVAlue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4  rounded-md  border-2 ">
      <h1 className="font-bold text-lg ">Filter Jobs</h1>
      <hr className="my-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <Button className="bg-[#bfe7ed] hover:bg-[#8be6f3] p-2 border-4 my-4 ">
              <h1 className="font-bold text-lg text-indigo-600 ">{data.filterType}</h1>
            </Button>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-[9px]">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
