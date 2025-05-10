import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DeleteIcon, Edit2, Eye, Loader2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";

const AdminJobsTable = () => {

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [loadingJobId, setLoadingJobId] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

 

  const deleteJob = async (jobId) => {
    try {
      setLoadingJobId(jobId);
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
        setFilterJobs(updatedJobs);
        dispatch(setAllAdminJobs(updatedJobs));

        toast.success(res.data.message || "Job deleted successfully.");
        setOpenPopoverId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete job.");
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <div className="mt-4">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader className="text-[18px]">
          <TableRow>
            <TableHead> Logo </TableHead>

            <TableHead>Role</TableHead>
            <TableHead>Company Name</TableHead>

            <TableHead>Salary - CTC(Annual)</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Total Applied</TableHead>

            <TableHead>Date</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[16px] font-medium">
          {filterJobs?.map((job) => (
            <tr>
              <Avatar className="w-16 h-16 mt-4 mr-4">
                <AvatarImage src={job?.company?.logo} />
              </Avatar>

              <TableCell className="font-semibold">{job?.title?.charAt(0).toUpperCase() + job?.title?.slice(1)}</TableCell>
              <TableCell>{job?.company?.name?.toUpperCase()}</TableCell>

              <TableCell>{job?.salary} LPA </TableCell>
              <TableCell>{job?.location?.charAt(0).toUpperCase() + job?.location?.slice(1)}</TableCell>

              <TableCell>{job?.jobType}</TableCell>
              <TableCell className="text-center">{job?.applications.length}</TableCell>

              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover open={openPopoverId === job._id} onOpenChange={(open) => setOpenPopoverId(open ? job._id : null)}>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex justify-end items-center gap-2 mt-2">
                      <Button className="min-w-24 h-10 px-3 text-sm font-semibold shadow-sm bg-[#BDD]">
                        <Eye className="w-4" /> Applicants
                      </Button>
                    </div>

                    <div onClick={() => deleteJob(job._id)} className="mt-2">
                      {loadingJobId === job._id ? (
                        <Button className="w-full my-2" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </Button>
                      ) : (
                        <Button className="w-full my-2 gap-4 flex items-center justify-start bg-[#ac2b3b]">
                          <DeleteIcon></DeleteIcon> Delete
                        </Button>
                      )}
                    </div>
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

export default AdminJobsTable;
