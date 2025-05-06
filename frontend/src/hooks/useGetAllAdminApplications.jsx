import { setAllAdminApplication } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminApplications = () => {
  const dispatch = useDispatch();

  useEffect((jobId) => {
    const fetchAllAdminApplications = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminApplication(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminApplications();
  }, []);
};

export default useGetAllAdminApplications;
