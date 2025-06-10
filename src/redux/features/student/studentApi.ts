import { baseApi } from "@/redux/api/baseApi";
import type { CourseOffering } from "@/types/course";
import type { TEnrollment } from "@/types/enrollment.type";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type { TStudent } from "@/types/student";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all students with filters
    getAllStudents: builder.query({
      query: (args?: TQueryParam[]) => {
        const params = new URLSearchParams();
        args?.forEach((item) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      providesTags: ["student"],
      transformResponse: (response: TResponseRedux<TStudent[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // Get student courses (enrolled + available)
    getStudentCourses: builder.query({
      query: (studentId: string) => ({
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

    // Enroll in a course
    enrollInCourse: builder.mutation({
      query: ({
        studentId,
        courseId,
      }: {
        studentId: string;
        courseId: string;
      }) => ({
        url: `/students/${studentId}/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["student-courses"],
    }),

    // Drop a course
    dropCourse: builder.mutation({
      query: ({
        studentId,
        courseId,
      }: {
        studentId: string;
        courseId: string;
      }) => ({
        url: `/students/${studentId}/courses/${courseId}/drop`,
        method: "DELETE",
      }),
      invalidatesTags: ["student-courses"],
    }),

    // Get enrollments
    getStudentEnrollments: builder.query({
      query: (studentId: string) => ({
        url: `/students/${studentId}/enrollments`,
        method: "GET",
      }),
      providesTags: ["student-enrollments"],
      transformResponse: (response: TResponseRedux<TEnrollment[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // Get logged-in student's profile
    getMyStudentProfile: builder.query<TResponseRedux<TStudent>, void>({
      query: () => ({
        url: "/students/my-profile",
        method: "GET",
      }),
      providesTags: ["student-profile"],
    }),

    // Add a new student
    addStudent: builder.mutation({
      query: (studentData: Partial<TStudent>) => ({
        url: "/users/create-student",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["student"],
    }),

    getMe: builder.query<TResponseRedux<IUserProfile>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user-profile"],
    }),
    // Update any student by ID
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

    // Delete a student
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),

    // Update own profile (optionally can be changed to /students/my-profile if backend supports)
    updateOwnProfile: builder.mutation({
      query: ({ id, body }: { id: string; body: Partial<TStudent> }) => ({
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
  useGetMyStudentProfileQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useUpdateOwnProfileMutation,
  useGetMeQuery,
} = studentApi;
