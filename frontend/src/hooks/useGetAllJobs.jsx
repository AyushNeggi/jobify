//hook to get all jobs with or without searchedquery 
import { setAllJobs, setOriginalJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
        if (res.data.success) {
          if (searchedQuery === "") {
            dispatch(setOriginalJobs(res.data.jobs));
          }
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchedQuery]);                    //so React will re-run useEffect every time you update the search box (that updates Redux).
};
export default useGetAllJobs;
