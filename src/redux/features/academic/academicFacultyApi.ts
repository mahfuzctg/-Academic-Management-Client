import { baseApi } from "@/redux/api/baseApi";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAcademicFaculty: build.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),

    getSingleAcademicFaculty: build.query({
      query: (id) => ({
        url: `/academic-faculties/${id}`,
        method: "GET",
      }),
      providesTags: ["AcademicFaculty"],
    }),

    updateAcademicFaculty: build.mutation({
      query: ({ id, data }) => ({
        url: `/academic-faculties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AcademicFaculty"],
    }),

    getAllAcademicFaculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/academic-faculties",
        method: "GET",
        params: arg,
      }),
      transformResponse: (baseQueryReturnValue: any) => {
        return {
          data: baseQueryReturnValue.data,
          meta: baseQueryReturnValue.meta,
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
