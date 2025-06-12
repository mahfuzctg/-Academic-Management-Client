import { baseApi } from "@/redux/api/baseApi";
import type { TMeta } from "@/types/meta";
import type { TOfferedCourse } from "@/types/offeredCourse";

type TQueryParam = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  [key: string]: unknown;
};

type TResponse = {
  data: TOfferedCourse[];
  meta: TMeta;
};

export const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query<TResponse, TQueryParam | void>({
      query: (params) => ({
        url: "/offered-courses",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["offered-courses"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllOfferedCoursesQuery } = offeredCourseApi;
