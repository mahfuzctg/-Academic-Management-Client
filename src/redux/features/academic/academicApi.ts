import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AcademicYear,
  Semester,
  Department,
  Program,
  AcademicStats,
} from "../../../types/academic";

export const academicApi = createApi({
  reducerPath: "academicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/academic" }),
  tagTypes: ["AcademicYear", "Semester", "Department", "Program"],
  endpoints: (builder) => ({
    // Academic Years
    getAcademicYears: builder.query<AcademicYear[], void>({
      query: () => "years",
      providesTags: ["AcademicYear"],
    }),
    getAcademicYear: builder.query<AcademicYear, string>({
      query: (id) => `years/${id}`,
      providesTags: (result, error, id) => [{ type: "AcademicYear", id }],
    }),
    createAcademicYear: builder.mutation<AcademicYear, Partial<AcademicYear>>({
      query: (body) => ({
        url: "years",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AcademicYear"],
    }),
    updateAcademicYear: builder.mutation<
      AcademicYear,
      { id: string; body: Partial<AcademicYear> }
    >({
      query: ({ id, body }) => ({
        url: `years/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AcademicYear", id },
      ],
    }),

    // Semesters
    getSemesters: builder.query<Semester[], void>({
      query: () => "semesters",
      providesTags: ["Semester"],
    }),
    getSemester: builder.query<Semester, string>({
      query: (id) => `semesters/${id}`,
      providesTags: (result, error, id) => [{ type: "Semester", id }],
    }),
    createSemester: builder.mutation<Semester, Partial<Semester>>({
      query: (body) => ({
        url: "semesters",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Semester"],
    }),
    updateSemester: builder.mutation<
      Semester,
      { id: string; body: Partial<Semester> }
    >({
      query: ({ id, body }) => ({
        url: `semesters/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Semester", id }],
    }),

    // Departments
    getDepartments: builder.query<Department[], void>({
      query: () => "departments",
      providesTags: ["Department"],
    }),
    getDepartment: builder.query<Department, string>({
      query: (id) => `departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),
    createDepartment: builder.mutation<Department, Partial<Department>>({
      query: (body) => ({
        url: "departments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<
      Department,
      { id: string; body: Partial<Department> }
    >({
      query: ({ id, body }) => ({
        url: `departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Department", id }],
    }),

    // Programs
    getPrograms: builder.query<Program[], void>({
      query: () => "programs",
      providesTags: ["Program"],
    }),
    getProgram: builder.query<Program, string>({
      query: (id) => `programs/${id}`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),
    createProgram: builder.mutation<Program, Partial<Program>>({
      query: (body) => ({
        url: "programs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Program"],
    }),
    updateProgram: builder.mutation<
      Program,
      { id: string; body: Partial<Program> }
    >({
      query: ({ id, body }) => ({
        url: `programs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Program", id }],
    }),

    // Academic Stats
    getAcademicStats: builder.query<AcademicStats, void>({
      query: () => "stats",
    }),
  }),
});

export const {
  useGetAcademicYearsQuery,
  useGetAcademicYearQuery,
  useCreateAcademicYearMutation,
  useUpdateAcademicYearMutation,
  useGetSemestersQuery,
  useGetSemesterQuery,
  useCreateSemesterMutation,
  useUpdateSemesterMutation,
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetProgramsQuery,
  useGetProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useGetAcademicStatsQuery,
} = academicApi;
