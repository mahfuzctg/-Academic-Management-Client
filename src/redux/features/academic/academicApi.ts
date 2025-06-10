import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type Department,
  type CreateDepartmentDto,
  type UpdateDepartmentDto,
  type Semester,
  type CreateSemesterDto,
  type UpdateSemesterDto,
  type AcademicYear,
  type CreateAcademicYearDto,
  type UpdateAcademicYearDto,
  type Course,
  type CreateCourseDto,
  type UpdateCourseDto,
  type Faculty,
  type CreateFacultyDto,
  type UpdateFacultyDto,
  type Program,
  type CreateProgramDto,
  type UpdateProgramDto,
  type AcademicStats,
} from "@/types/academic";

export const academicApi = createApi({
  reducerPath: "academicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "Department",
    "Semester",
    "AcademicYear",
    "Course",
    "Faculty",
    "Program",
  ],
  endpoints: (builder) => ({
    // Department endpoints
    getDepartments: builder.query<Department[], void>({
      query: () => "departments",
      providesTags: ["Department"],
    }),
    addDepartment: builder.mutation<Department, CreateDepartmentDto>({
      query: (data) => ({
        url: "departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<Department, UpdateDepartmentDto>({
      query: ({ id, ...data }) => ({
        url: `departments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),

    // Semester endpoints
    getSemesters: builder.query<Semester[], void>({
      query: () => "semesters",
      providesTags: ["Semester"],
    }),
    addSemester: builder.mutation<Semester, CreateSemesterDto>({
      query: (data) => ({
        url: "semesters",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Semester"],
    }),
    updateSemester: builder.mutation<Semester, UpdateSemesterDto>({
      query: ({ id, ...data }) => ({
        url: `semesters/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Semester"],
    }),
    deleteSemester: builder.mutation<void, string>({
      query: (id) => ({
        url: `semesters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Semester"],
    }),

    // Academic Year endpoints
    getAcademicYears: builder.query<AcademicYear[], void>({
      query: () => "academic-years",
      providesTags: ["AcademicYear"],
    }),
    addAcademicYear: builder.mutation<AcademicYear, CreateAcademicYearDto>({
      query: (data) => ({
        url: "academic-years",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AcademicYear"],
    }),
    updateAcademicYear: builder.mutation<AcademicYear, UpdateAcademicYearDto>({
      query: ({ id, ...data }) => ({
        url: `academic-years/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AcademicYear"],
    }),
    deleteAcademicYear: builder.mutation<void, string>({
      query: (id) => ({
        url: `academic-years/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AcademicYear"],
    }),

    // Course endpoints
    getCourses: builder.query<Course[], void>({
      query: () => "courses",
      providesTags: ["Course"],
    }),
    addCourse: builder.mutation<Course, CreateCourseDto>({
      query: (data) => ({
        url: "courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation<Course, UpdateCourseDto>({
      query: ({ id, ...data }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Faculty endpoints
    getFaculties: builder.query<Faculty[], void>({
      query: () => "faculties",
      providesTags: ["Faculty"],
    }),
    addFaculty: builder.mutation<Faculty, CreateFacultyDto>({
      query: (data) => ({
        url: "faculties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faculty"],
    }),
    updateFaculty: builder.mutation<Faculty, UpdateFacultyDto>({
      query: ({ id, ...data }) => ({
        url: `faculties/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: builder.mutation<void, string>({
      query: (id) => ({
        url: `faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),

    // Program endpoints
    getPrograms: builder.query<Program[], void>({
      query: () => "programs",
      providesTags: ["Program"],
    }),
    addProgram: builder.mutation<Program, CreateProgramDto>({
      query: (data) => ({
        url: "programs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Program"],
    }),
    updateProgram: builder.mutation<Program, UpdateProgramDto>({
      query: ({ id, ...data }) => ({
        url: `programs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Program"],
    }),
    deleteProgram: builder.mutation<void, string>({
      query: (id) => ({
        url: `programs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Program"],
    }),

    // Academic Stats endpoint
    getAcademicStats: builder.query<AcademicStats, void>({
      query: () => "academic/stats",
      providesTags: [
        "Department",
        "Semester",
        "AcademicYear",
        "Course",
        "Faculty",
        "Program",
      ],
    }),
  }),
});

export const {
  // Department hooks
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,

  // Semester hooks
  useGetSemestersQuery,
  useAddSemesterMutation,
  useUpdateSemesterMutation,
  useDeleteSemesterMutation,

  // Academic Year hooks
  useGetAcademicYearsQuery,
  useAddAcademicYearMutation,
  useUpdateAcademicYearMutation,
  useDeleteAcademicYearMutation,

  // Course hooks
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,

  // Faculty hooks
  useGetFacultiesQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,

  // Program hooks
  useGetProgramsQuery,
  useAddProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,

  // Academic Stats hook
  useGetAcademicStatsQuery,
} = academicApi;
