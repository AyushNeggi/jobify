import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5 ">
          <Input className="w-fit border border-gray-600 " placeholder="search for company" onChange={(e) => setInput(e.target.value)} />

          <Button className=" bg-[#0468BF] hover:bg-[#049DD9] " onClick={() => navigate("/admin/companies/create")}>
            Add new company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
