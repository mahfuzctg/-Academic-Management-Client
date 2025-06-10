import { baseApi } from "@/redux/api/baseApi";
import type { CourseOffering, Enrollment } from "@/types/course";
import type { TQueryParam, TResponseRedux } from "@/types/global";
<<<<<<< HEAD
import type { Student } from "@/types/student";

=======
import type { TStudent } from "@/types/student";
import type { TOfferedCourse } from "@/types/studentCourse.type";
import type { TEnrollment } from "@/types/enrollment.type";
>>>>>>> 3e1a0a52a587a93e210b4802c457a26d39ff97fd
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
<<<<<<< HEAD
          enrolledCourses: CourseOffering[];
          availableCourses: Course[];
=======
          enrolledCourses: TOfferedCourse[];
          availableCourses: TOfferedCourse[];
>>>>>>> 3e1a0a52a587a93e210b4802c457a26d39ff97fd
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

    // Update own profile
    updateStudent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["student-profile"],
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
<<<<<<< HEAD
  useUpdateStudentMutation,
=======
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
>>>>>>> 3e1a0a52a587a93e210b4802c457a26d39ff97fd
} = studentApi;
