import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { IOfferedCourse } from "@/types/offeredCourse";

export const offerCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args: TQueryParam[] = []) => {
        const params = new URLSearchParams();
        args.forEach((item) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getMyOfferedCourses: builder.query({
      query: (args: TQueryParam[] = []) => {
        const params = new URLSearchParams();
        args.forEach((item) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleOfferedCourse: builder.query({
      query: (id: string) => ({
        url: `/offered-courses/${id}`,
        method: "GET",
      }),
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<IOfferedCourse>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    createOfferedCourse: builder.mutation({
      query: (data: Partial<IOfferedCourse>) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    updateOfferedCourse: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<IOfferedCourse> }) => ({
        url: `/offered-courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    deleteOfferedCourse: builder.mutation({
      query: (id: string) => ({
        url: `/offered-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    getOfferedCoursesBySemester: builder.query({
      query: (academicSemesterId: string) => ({
        url: `/offered-courses/by-semester/${academicSemesterId}`,
        method: "GET",
      }),
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getOfferedCoursesByYear: builder.query({
      query: (academicYearId: string) => ({
        url: `/offered-courses/by-year/${academicYearId}`,
        method: "GET",
      }),
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
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
  useGetOfferedCoursesBySemesterQuery,
  useGetOfferedCoursesByYearQuery,
} = offerCourseApi;
