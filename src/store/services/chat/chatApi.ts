import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["chat", "msg"],
  endpoints: (builder) => ({
    getRoom: builder.query({
      query: (id) => `/chat/${id}`,
      providesTags: (result, error, id) => [{ type: "chat", id }],
    }),

    updateRoom: builder.mutation({
      query: (id, action, chatId) => ({
        url: `/chat/${id}`,
        method: "PATCH",
        params: { action, chatId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "chat", id }],
    }),
  }),
});

export const { useGetRoomQuery, useUpdateRoomMutation } = chatApi;
