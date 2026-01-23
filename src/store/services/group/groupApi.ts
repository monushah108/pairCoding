import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface groupPayload {
  id: String;
  name: String;
  picture: String;
}

export const GroupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["group", "member"],
  endpoints: (builder) => ({
    getAllGroups: builder.query<group[], String>({
      query: () => `/server`,
      providesTags: (r, e, id) => [{ type: "group", id }],
    }),

    createGroup: builder.mutation({
      query: (body) => ({
        url: "/server",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["group"],
    }),

    updateGroup: builder.mutation<group, groupPayload>({
      query: ({ id, name, picture }) => ({
        url: `/server/${id}`,
        method: "PATCH",
        body: { name, picture },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "group", id }],
    }),

    deleteGroup: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "group",
          id,
        },
      ],
    }),
  }),
});

export const {
  useGetAllGroupsQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} = GroupApi;
