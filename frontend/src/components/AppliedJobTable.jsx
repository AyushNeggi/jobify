import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Navbar from "./shared/Navbar";

const AppliedJobTable = () => {

  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <hr className="my-4" />
      <div className="max-w-6xl mx-auto  bg-white rounded-2xl">
        <h1 className="font-semibold text-lg my-8 text-center  border border-black p-2">Applied Jobs</h1>

        <Table>
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow className="text-[20px] shadow-lg font-medium ">
              <TableHead>Job Role </TableHead>
              <TableHead> Company</TableHead>
              <TableHead> Salary </TableHead>
              <TableHead> Location</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="text-right">Status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[16px] font-medium">
            {allAppliedJobs.length <= 0 ? (
              <span> you haven't applied any job yet</span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell className="font-semibold">{appliedJob?.job?.title}</TableCell>
                  <TableCell className="font-medium">{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell>{appliedJob?.job?.salary} LPA</TableCell>
                  <TableCell>{appliedJob?.job?.location}</TableCell>
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right text-[16px]">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected" ? `bg-red-700` : appliedJob.status === "pending" ? `bg-gray-400` : `bg-green-400`
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
