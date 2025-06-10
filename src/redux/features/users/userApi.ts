import { baseApi } from "@/redux/api/baseApi";
import type { TResponseRedux } from "@/types/global";
import type { IUserProfile } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch logged-in user profile (student/admin/faculty)
    getMe: builder.query<TResponseRedux<IUserProfile>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user-profile"],
    }),
  }),
});

export const { useGetMeQuery } = userApi;
