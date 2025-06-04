import { baseApi } from "@/redux/api/baseApi";
import type { ICourse } from "@/types/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<ICourse[], void>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: ICourse[] };
        return res.data;
      },
      providesTags: ["courses"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllCoursesQuery } = courseApi;
