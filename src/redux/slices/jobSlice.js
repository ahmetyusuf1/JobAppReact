import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },
    deleteJob: (state, action) => {
      const index = state.jobs.findIndex((i) => i.id === action.payload);

      state.jobs.splice(index, 1);
    },
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();
      const filtered = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );

      state.jobs = filtered;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "new-old":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "old-new":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  setLoading,
  setError,
  setJobs,
  deleteJob,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
