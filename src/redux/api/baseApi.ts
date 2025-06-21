import type { DefinitionType } from "@reduxjs/toolkit/query";
import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  // baseUrl: "https://academic-management-server-ten.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 404 & 403 errors with toast
  if (result?.error?.status === 404 || result?.error?.status === 403) {
    const errorMessage = result.error.data as { message?: string };
    if (errorMessage?.message) toast.error(errorMessage.message);
  }

  // Handle 401 error by trying to refresh token
  if (result?.error?.status === 401) {
    console.log("Sending refresh token");

    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      // Retry original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "semesters",
    "courses",
    "offeredCourses",
    "students",
    "academicDepartments",
    "academicSemesters",
    "jobs",
    "grades",
    "admins",
    "academicYears",
    "faculties",
    "programs",
    "semesterRegistrations",
    "enrolledCourses",
    "academicFaculties",
    "studentEnrollments",
    "studentProfiles",
    "studentCourses",
    "userProfiles",
    "blogs",
  ],
  endpoints: () => ({}),
});
