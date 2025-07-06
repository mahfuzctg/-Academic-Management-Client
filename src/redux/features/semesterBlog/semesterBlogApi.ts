import { baseApi } from "@/redux/api/baseApi";
import type { ISemesterBlog } from "@/types/semesterBlog";

export const semesterBlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterBlogs: builder.query<ISemesterBlog[], void>({
      query: () => ({
        url: "/semester-blogs",
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: ISemesterBlog[] };
        return res.data;
      },
      providesTags: ["semesterBlogs"],
    }),

    getSingleSemesterBlog: builder.query<ISemesterBlog, string>({
      query: (id) => ({
        url: `/semester-blogs/${id}`,
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const res = response as { data: ISemesterBlog };
        return res.data;
      },
      providesTags: ["semesterBlogs"],
    }),

    createSemesterBlog: builder.mutation<ISemesterBlog, Partial<ISemesterBlog>>(
      {
        query: (data) => ({
          url: "/semester-blogs",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["semesterBlogs"],
      }
    ),

    updateSemesterBlog: builder.mutation<
      ISemesterBlog,
      { id: string; data: Partial<ISemesterBlog> }
    >({
      query: ({ id, data }) => ({
        url: `/semester-blogs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["semesterBlogs"],
    }),

    deleteSemesterBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/semester-blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["semesterBlogs"],
    }),

    voteSemesterBlog: builder.mutation<ISemesterBlog, string>({
      query: (id) => ({
        url: `/semester-blogs/${id}/vote`,
        method: "PATCH",
      }),
      invalidatesTags: ["semesterBlogs"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllSemesterBlogsQuery,
  useGetSingleSemesterBlogQuery,
  useCreateSemesterBlogMutation,
  useUpdateSemesterBlogMutation,
  useDeleteSemesterBlogMutation,
  useVoteSemesterBlogMutation,
} = semesterBlogApi;
