import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  JobListing,
  FreelancerProfile,
  Proposal,
  JobFilters,
  FreelancerFilters,
  JobFormData,
  ProposalFormData,
} from "@/types/job";

interface JobState {
  jobs: JobListing[];
  freelancers: FreelancerProfile[];
  selectedJob: JobListing | null;
  selectedFreelancer: FreelancerProfile | null;
  loading: boolean;
  error: string | null;
  jobFilters: JobFilters;
  freelancerFilters: FreelancerFilters;
}

const initialState: JobState = {
  jobs: [],
  freelancers: [],
  selectedJob: null,
  selectedFreelancer: null,
  loading: false,
  error: null,
  jobFilters: {},
  freelancerFilters: {},
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (filters: JobFilters) => {
    // TODO: Replace with actual API call
    const response = await fetch(
      "/api/jobs?" + new URLSearchParams(filters as any)
    );
    if (!response.ok) throw new Error("Failed to fetch jobs");
    return response.json();
  }
);

export const fetchFreelancers = createAsyncThunk(
  "jobs/fetchFreelancers",
  async (filters: FreelancerFilters) => {
    // TODO: Replace with actual API call
    const response = await fetch(
      "/api/freelancers?" + new URLSearchParams(filters as any)
    );
    if (!response.ok) throw new Error("Failed to fetch freelancers");
    return response.json();
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (data: JobFormData) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create job");
    return response.json();
  }
);

export const submitProposal = createAsyncThunk(
  "jobs/submitProposal",
  async (data: ProposalFormData) => {
    // TODO: Replace with actual API call
    const response = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit proposal");
    return response.json();
  }
);

export const updateJobStatus = createAsyncThunk(
  "jobs/updateJobStatus",
  async ({
    jobId,
    status,
  }: {
    jobId: string;
    status: JobListing["status"];
  }) => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/jobs/${jobId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update job status");
    return response.json();
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJob: (state, action: PayloadAction<JobListing | null>) => {
      state.selectedJob = action.payload;
    },
    setSelectedFreelancer: (
      state,
      action: PayloadAction<FreelancerProfile | null>
    ) => {
      state.selectedFreelancer = action.payload;
    },
    setJobFilters: (state, action: PayloadAction<JobFilters>) => {
      state.jobFilters = { ...state.jobFilters, ...action.payload };
    },
    setFreelancerFilters: (state, action: PayloadAction<FreelancerFilters>) => {
      state.freelancerFilters = {
        ...state.freelancerFilters,
        ...action.payload,
      };
    },
    clearJobFilters: (state) => {
      state.jobFilters = {};
    },
    clearFreelancerFilters: (state) => {
      state.freelancerFilters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      })
      // Fetch Freelancers
      .addCase(fetchFreelancers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancers = action.payload;
      })
      .addCase(fetchFreelancers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch freelancers";
      })
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create job";
      })
      // Submit Proposal
      .addCase(submitProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProposal.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find((j) => j.id === action.payload.jobId);
        if (job) {
          job.proposals.push(action.payload);
        }
      })
      .addCase(submitProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to submit proposal";
      })
      // Update Job Status
      .addCase(updateJobStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        const job = state.jobs.find((j) => j.id === action.payload.id);
        if (job) {
          job.status = action.payload.status;
        }
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update job status";
      });
  },
});

export const {
  setSelectedJob,
  setSelectedFreelancer,
  setJobFilters,
  setFreelancerFilters,
  clearJobFilters,
  clearFreelancerFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
