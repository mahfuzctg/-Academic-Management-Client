import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { JobFilters } from "@/types/job";

interface JobState {
  filters: JobFilters;
}

const initialState: JobState = {
  filters: {},
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<JobFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setFilters, clearFilters } = jobSlice.actions;
export default jobSlice.reducer;
