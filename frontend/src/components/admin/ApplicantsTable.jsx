import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  
  const { applicants } = useSelector((store) => store.application);
  const [openPopoverId,setOpenPopoverId] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      setOpenPopoverId(null);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>

            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                      {item?.applicant?.fullname.split(" ")[0]} resume.pdf
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover open={openPopoverId === item._id} onOpenChange={(open) => setOpenPopoverId(open ? item._id : null)}>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {item?.status === "pending" ? (
                        shortlistingStatus.map((status, index) => (
                          <div onClick={() => statusHandler(status, item?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                            <button
                              className={`inline-flex items-center justify-center min-w-24 h-10 px-3 rounded-md text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                status === "Accepted" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}>        
                              {status}
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2">
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded ${item.status === "accepted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800" }`}>
                          
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
