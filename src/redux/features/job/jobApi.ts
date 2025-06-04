import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { JobListing, JobFormData, ProposalFormData } from "@/types/job";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/jobs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["job"],
      transformResponse: (response: TResponseRedux<JobListing[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createJob: builder.mutation({
      query: (data: JobFormData) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),

    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),

    submitProposal: builder.mutation({
      query: (data: ProposalFormData) => ({
        url: "/jobs/proposals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),

    updateJobStatus: builder.mutation({
      query: ({ jobId, status }) => ({
        url: `/jobs/${jobId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["job"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useSubmitProposalMutation,
  useUpdateJobStatusMutation,
} = jobApi;
