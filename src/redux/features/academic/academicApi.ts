import { baseApi } from "@/redux/api/baseApi";
import type { TQueryParam, TResponseRedux } from "@/types/global";
import type {
  AcademicYear,
  Semester,
  Department,
  Program,
  AcademicStats,
} from "../../../types/academic";

const academicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Academic Years
    getAcademicYears: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic/years",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<AcademicYear[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getAcademicYear: builder.query({
      query: (id) => ({
        url: `/academic/years/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "academic", id }],
      transformResponse: (response: TResponseRedux<AcademicYear>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createAcademicYear: builder.mutation({
      query: (data) => ({
        url: "/academic/years",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    updateAcademicYear: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic/years/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    // Semesters
    getSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic/semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<Semester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSemester: builder.query({
      query: (id) => ({
        url: `/academic/semesters/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "academic", id }],
      transformResponse: (response: TResponseRedux<Semester>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: "/academic/semesters",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    updateSemester: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic/semesters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    // Departments
    getDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic/departments",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<Department[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getDepartment: builder.query({
      query: (id) => ({
        url: `/academic/departments/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "academic", id }],
      transformResponse: (response: TResponseRedux<Department>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic/departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic/departments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    // Programs
    getPrograms: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic/programs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<Program[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getProgram: builder.query({
      query: (id) => ({
        url: `/academic/programs/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "academic", id }],
      transformResponse: (response: TResponseRedux<Program>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createProgram: builder.mutation({
      query: (data) => ({
        url: "/academic/programs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    updateProgram: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic/programs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["academic"],
    }),

    // Academic Stats
    getAcademicStats: builder.query({
      query: () => ({
        url: "/academic/stats",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<AcademicStats>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
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
