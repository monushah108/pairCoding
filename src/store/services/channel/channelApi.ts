import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/channel",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["channel"],
  endpoints: (builder) => ({
    getAllChannel: builder.query({
      query: (id) => `/${id}`,

      providesTags: ["channel"],
    }),

    createChannel: builder.mutation({
      query: (id, ...body) => ({
        url: `/${id}`,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["channel"],
    }),

    updateChannel: builder.mutation({
      query: (id, ...body) => ({
        url: id,
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: (r, e, { id }) =>
        r
          ? [
              {
                type: "channel",
                ...r.map((id) => id),
              },
            ]
          : [{ type: "channel", id }],
    }),

    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["channel"],
    }),
  }),
});

export const {
  useGetAllChannelQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useUpdateChannelMutation,
} = channelApi;
