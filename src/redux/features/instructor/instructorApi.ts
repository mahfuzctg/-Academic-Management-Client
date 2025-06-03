import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";

const instructorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructors: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/instructors",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["instructor"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addInstructor: builder.mutation({
      query: (data) => ({
        url: "/instructors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["instructor"],
    }),

    updateInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/instructors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["instructor"],
    }),

    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/instructors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["instructor"],
    }),

    assignSubject: builder.mutation({
      query: ({ instructorId, subjectId }) => ({
        url: `/instructors/${instructorId}/subjects`,
        method: "POST",
        body: { subjectId },
      }),
      invalidatesTags: ["instructor"],
    }),

    updateGrade: builder.mutation({
      query: ({ instructorId, subjectId, studentId, grade }) => ({
        url: `/instructors/${instructorId}/subjects/${subjectId}/grades`,
        method: "POST",
        body: { studentId, grade },
      }),
      invalidatesTags: ["instructor"],
    }),
  }),
});

export const {
  useGetAllInstructorsQuery,
  useAddInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
  useAssignSubjectMutation,
  useUpdateGradeMutation,
} = instructorApi;
