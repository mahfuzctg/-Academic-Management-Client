import { baseApi } from "@/redux/api/baseApi";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAcademicFaculty: build.mutation({
      query: (data) => ({
        url: "/academic-faculty/create-academic-faculty",
        method: "POST",
        data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),

    getSingleAcademicFaculty: build.query({
      query: (id) => ({
        url: `/academic-faculty/${id}`,
        method: "GET",
      }),
      providesTags: ["AcademicFaculty"],
    }),

    updateAcademicFaculty: build.mutation({
      query: ({ id, data }) => ({
        url: `/academic-faculty/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),

    getAllAcademicFaculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/academic-faculty",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: any; meta: any }) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["AcademicFaculty"],
    }),
  }),
});

export const {
  useCreateAcademicFacultyMutation,
  useGetSingleAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
} = academicFacultyApi;
