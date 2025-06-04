import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { Student, Course, Enrollment } from "@/types/student";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["student"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getStudentCourses: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}/courses`,
        method: "GET",
      }),
      providesTags: ["student-courses"],
      transformResponse: (
        response: TResponseRedux<{
          enrolledCourses: Course[];
          availableCourses: Course[];
        }>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    enrollInCourse: builder.mutation({
      query: ({ studentId, courseId }) => ({
        url: `/students/${studentId}/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["student-courses"],
    }),

    dropCourse: builder.mutation({
      query: ({ studentId, courseId }) => ({
        url: `/students/${studentId}/courses/${courseId}/drop`,
        method: "DELETE",
      }),
      invalidatesTags: ["student-courses"],
    }),

    getStudentEnrollments: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}/enrollments`,
        method: "GET",
      }),
      providesTags: ["student-enrollments"],
      transformResponse: (response: TResponseRedux<Enrollment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getStudentProfile: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      providesTags: ["student-profile"],
      transformResponse: (response: TResponseRedux<Student>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentCoursesQuery,
  useEnrollInCourseMutation,
  useDropCourseMutation,
  useGetStudentEnrollmentsQuery,
  useGetStudentProfileQuery,
} = studentApi;
