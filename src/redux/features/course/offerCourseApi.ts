import { baseApi } from "@/redux/api/baseApi";
import type { IOfferedCourse } from "@/types/offeredCourse";

export const offerCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query<IOfferedCourse[], void>({
      query: () => ({
        url: "/offered-courses",
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: IOfferedCourse[] };
        return res.data;
      },
      providesTags: ["offeredCourses"],
    }),

    getMyOfferedCourses: builder.query<IOfferedCourse[], void>({
      query: () => ({
        url: "/offered-courses/my-offered-courses",
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: IOfferedCourse[] };
        return res.data;
      },
      providesTags: ["offeredCourses"],
    }),

    getSingleOfferedCourse: builder.query<IOfferedCourse, string>({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: IOfferedCourse };
        return res.data;
      },
      providesTags: ["offeredCourses"],
    }),

    createOfferedCourse: builder.mutation<
      IOfferedCourse,
      Partial<IOfferedCourse>
    >({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    updateOfferedCourse: builder.mutation<
      IOfferedCourse,
      { id: string; data: Partial<IOfferedCourse> }
    >({
      query: ({ id, data }) => ({
        url: `/offered-courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    deleteOfferedCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offeredCourses"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllOfferedCoursesQuery,
  useGetMyOfferedCoursesQuery,
  useGetSingleOfferedCourseQuery,
  useCreateOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
} = offerCourseApi;
