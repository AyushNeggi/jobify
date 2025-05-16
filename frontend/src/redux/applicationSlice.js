import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
    applicationStatus: "",
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setApplicationStatus: (state, action) => {
      state.applicationStatus = action.payload;
    },
  },
});
export const { setAllApplicants, setApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
