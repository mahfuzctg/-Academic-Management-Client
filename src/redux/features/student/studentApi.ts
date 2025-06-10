import { baseApi } from "@/redux/api/baseApi";
import type { Course } from "@/types/academic";
import type { CourseOffering, Enrollment, TEnrollment } from "@/types/course";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { Student, TStudent } from "@/types/student";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation({
      query: (data) => ({
        url: "/students/create-student",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Student"],
    }),

    getSingleStudent: build.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),

    updateStudent: build.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Student"],
    }),

    getAllStudents: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/students",
        method: "GET",
        params: arg,
      }),
      transformResponse: (baseQueryReturnValue: any) => {
        return {
          data: baseQueryReturnValue.data,
          meta: baseQueryReturnValue.meta,
        };
      },
      providesTags: ["Student"],
    }),

    getStudentCourses: build.query({
      query: (studentId) => ({
        url: `/students/${studentId}/courses`,
        method: "GET",
      }),
      providesTags: ["student-courses"],
      transformResponse: (
        response: TResponseRedux<{
          enrolledCourses: CourseOffering[];
          availableCourses: Course[];
        }>
      ) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    enrollInCourse: build.mutation({
      query: ({ studentId, courseId }) => ({
        url: `/students/${studentId}/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["student-courses"],
    }),

    dropCourse: build.mutation({
      query: ({ studentId, courseId }) => ({
        url: `/students/${studentId}/courses/${courseId}/drop`,
        method: "DELETE",
      }),
      invalidatesTags: ["student-courses"],
    }),

    getStudentEnrollments: build.query({
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

    getStudentProfile: build.query({
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
    addStudent: build.mutation({
      query: (studentData: Partial<TStudent>) => ({
        url: "/users/create-student",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["student"],
    }),

    //  Update Student
    updateOwnProfile: build.mutation({
      query: ({ id, body }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["student-profile"],
    }),

    deleteStudent: build.mutation({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentCoursesQuery,
  useEnrollInCourseMutation,
  useDropCourseMutation,
  useGetStudentEnrollmentsQuery,
  useGetStudentProfileQuery,
  useAddStudentMutation,
  useUpdateOwnProfileMutation,
  useDeleteStudentMutation,
} = studentApi;
