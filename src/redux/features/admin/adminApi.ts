import { baseApi } from "@/redux/api/baseApi";
import type { TResponseRedux } from "@/types/global";
import type {
  SystemStats,
  RecentActivity,
  Announcement,
  ChatMessage,
  ChatRoom,
} from "@/types/admin";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemStats: builder.query<TResponseRedux<SystemStats>, void>({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<SystemStats>) => response,
    }),

    getRecentActivities: builder.query<TResponseRedux<RecentActivity[]>, void>({
      query: () => ({
        url: "/admin/activities",
        method: "GET",
      }),
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<RecentActivity[]>) =>
        response,
    }),

    getAnnouncements: builder.query<TResponseRedux<Announcement[]>, void>({
      query: () => ({
        url: "/admin/announcements",
        method: "GET",
      }),
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<Announcement[]>) => response,
    }),

    createAnnouncement: builder.mutation<
      TResponseRedux<Announcement>,
      Partial<Announcement>
    >({
      query: (data) => ({
        url: "/admin/announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
      transformResponse: (response: TResponseRedux<Announcement>) => response,
    }),

    // Chat endpoints
    getChatRooms: builder.query<TResponseRedux<ChatRoom[]>, void>({
      query: () => ({
        url: "/admin/chat/rooms",
        method: "GET",
      }),
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<ChatRoom[]>) => response,
    }),

    getChatMessages: builder.query<TResponseRedux<ChatMessage[]>, string>({
      query: (roomId) => ({
        url: `/admin/chat/rooms/${roomId}/messages`,
        method: "GET",
      }),
      providesTags: ["academic"],
      transformResponse: (response: TResponseRedux<ChatMessage[]>) => response,
    }),

    sendMessage: builder.mutation<
      TResponseRedux<ChatMessage>,
      { roomId: string; message: string }
    >({
      query: ({ roomId, message }) => ({
        url: `/admin/chat/rooms/${roomId}/messages`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["academic"],
      transformResponse: (response: TResponseRedux<ChatMessage>) => response,
    }),

    createChatRoom: builder.mutation<
      TResponseRedux<ChatRoom>,
      { name: string; participants: string[] }
    >({
      query: (data) => ({
        url: "/admin/chat/rooms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic"],
      transformResponse: (response: TResponseRedux<ChatRoom>) => response,
    }),
  }),
});

export const {
  useGetSystemStatsQuery,
  useGetRecentActivitiesQuery,
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useGetChatRoomsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useCreateChatRoomMutation,
} = adminApi;
