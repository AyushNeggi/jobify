import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";


const Latestjobs = () => {

  const{originalJobs} = useSelector((store=>store.job));
  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className=" text-4xl font-bold p-4 ">
        <span className="text-[#7658ef] ">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {originalJobs?.length === 0 ? (
    <div className="col-span-full mx-auto my-10">
      <span className="p-4 text-center border-b-4 border-indigo-100 font-medium text-[16px] shadow-lg">
        Currently no job is available at this moment
      </span>
    </div>
  ) : (
    <AnimatePresence>
      {originalJobs?.slice(0, 6).map((job) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <LatestJobCards job={job} />
        </motion.div>
      ))}
    </AnimatePresence>
  )}
</div>
</div>
  );
};

export default Latestjobs;