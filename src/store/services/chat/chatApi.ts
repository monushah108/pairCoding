import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["chat"],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: (id) => `/chat/${id}`,
      providesTags: (r, e, { id }) =>
        r
          ? [
              {
                type: "chat",
                ...r.map((id) => id),
              },
            ]
          : [{ type: "channel", id }],
    }),

    updateMsg: builder.mutation({
      query: (id, action, chatId) => ({
        url: `/chat/${id}`,
        method: "PATCH",
        params: { action, chatId },
      }),
      invalidatesTags: (r, e, { chatId }) =>
        r
          ? [
              {
                type: "chat",
                ...r.map((i) => i.id == id),
              },
            ]
          : [{ type: "chat", id }],
    }),
  }),
});
