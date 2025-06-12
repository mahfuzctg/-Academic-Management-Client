import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["faculty"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    singleFaculty: builder.query({
      query: ({ id }) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
    }),

    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/faculties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faculty"],
    }),

    updateFaculty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faculties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faculty"],
    }),

    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faculty"],
    }),
  }),
});

export const {
  useGetAllFacultiesQuery,
  useSingleFacultyQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = facultyApi;
