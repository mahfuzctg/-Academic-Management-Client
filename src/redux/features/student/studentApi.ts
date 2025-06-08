import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { TStudent } from "@/types/student";
import type { TOfferedCourse } from "@/types/studentCourse.type";
import type { TEnrollment } from "@/types/enrollment.type";
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
          params,
        };
      },
      providesTags: ["student"],
      transformResponse: (response: TResponseRedux<any>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getStudentCourses: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}/courses`,
        method: "GET",
      }),
      providesTags: ["student-courses"],
      transformResponse: (
        response: TResponseRedux<{
          enrolledCourses: TOfferedCourse[];
          availableCourses: TOfferedCourse[];
        }>
      ) => ({
        data: response.data,
        meta: response.meta,
      }),
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
      transformResponse: (response: TResponseRedux<TEnrollment[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getStudentProfile: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      providesTags: ["student-profile"],
      transformResponse: (response: TResponseRedux<TStudent>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    //  Add Student
    addStudent: builder.mutation({
      query: (studentData: Partial<TStudent>) => ({
        url: "/users/create-student",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["student"],
    }),

    //  Update Student
    updateStudent: builder.mutation({
      query: ({
        id,
        updatedData,
      }: {
        id: string;
        updatedData: Partial<TStudent>;
      }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["student", "student-profile"],
    }),

    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
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
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
