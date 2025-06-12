import { baseApi } from "@/redux/api/baseApi";
import type { IOfferedCourse } from "@/types/offeredCourse";

export const offeredCourseApi = baseApi.injectEndpoints({
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

    getSingleOfferedCourse: builder.query<IOfferedCourse, string>({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: IOfferedCourse };
        return res.data;
      },
      providesTags: (_result, _err, id) => [{ type: "offeredCourses", id }],
    }),

    createOfferedCourse: builder.mutation<
      IOfferedCourse,
      Partial<IOfferedCourse>
    >({
      query: (body) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body,
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
      invalidatesTags: (_result, _err, { id }) => [
        { type: "offeredCourses", id },
      ],
    }),

    deleteOfferedCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offeredCourses"],
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
  }),
  overrideExisting: true,
});

export const {
  useGetAllOfferedCoursesQuery,
  useGetSingleOfferedCourseQuery,
  useCreateOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
  useGetMyOfferedCoursesQuery,
} = offeredCourseApi;
