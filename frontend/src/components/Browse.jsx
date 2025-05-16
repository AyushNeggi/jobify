import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion, AnimatePresence } from "framer-motion";
import JobSkeleton from "./JobSkeleton";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);
  const [visibleJobs, setVisibleJobs] = useState([]);

  useEffect(() => {               // Cleanup searchedQuery on unmount
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setVisibleJobs(allJobs);
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10">
          Search Results ({visibleJobs.length})
        </h1>
        {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <JobSkeleton key={index} />
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimatePresence>
      {visibleJobs.map((job) => (
        <motion.div
          key={job?._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Job job={job} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

