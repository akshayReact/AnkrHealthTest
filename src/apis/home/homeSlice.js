import { FILTER_JOB_TYPE } from "@/Constants";
import { createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";

const initialState = {
  homeJobs: "",
  isLoading: false,
  isReachedEnd: false,
  nextPageUrl: undefined,
  homeJobsFetchedSuccess: "",
  homeJobsFetchedError: "",
  selectedJob: "",
  isResetAllJobs: false,
  homeJobsFilters: ""
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getJobsList(state, action) {
      if (state.homeJobs.length < 1) {
        state.isLoading = true;
      }
      state.homeJobsFilters = action.payload;
      if (state.homeJobs.length > 0 && state.homeJobsFilters.page == 1) {
        state.homeJobs = []
      }
      state.homeJobsFetchedSuccess = "";
      state.homeJobsFetchedError = "";
    },
    getJobsListSuccess(state, action) {
      state.isLoading = false;
      state.nextPageUrl = action.payload.next_page_url
      let jobsPayload = null;
      jobsPayload = action.payload.data.map((item) => {
        return {
          ...item,
          employment_type: FILTER_JOB_TYPE[Math.floor(Math.random() * FILTER_JOB_TYPE.length)].label
        }
      });
      if (state.homeJobsFilters.jobType) {
        jobsPayload = jobsPayload.filter((jobItem) => {
          return jobItem.employment_type.toLocaleLowerCase() == state.homeJobsFilters.jobType.toLocaleLowerCase()
        })
      }

      if (state.isResetAllJobs) {
        state.homeJobs = jobsPayload || [];
      } else {
        state.homeJobs = [
          ...state.homeJobs,
          ...jobsPayload,
        ];
        if (jobsPayload.length < 1) {
          state.isReachedEnd = true;
        }
      }
      state.homeJobsFetchedError = "";
    },
    getJobsListFailure(state, action) {
      state.isLoading = false;
      state.homeJobsFetchedSuccess = "";
      state.homeJobsFetchedError = action.payload?.message || action.payload.response?.data;
    },
    setSelectedJobData(state, action) {
      state.selectedJob = action.payload.item
    },
    toggleIsResetAllJobs(state, action) {
      state.isResetAllForms = action.payload;
    }
  },
});

export const {
  getJobsList,
  getJobsListSuccess,
  getJobsListFailure,
  setSelectedJobData,
} = homeSlice.actions;
export default homeSlice.reducer;
