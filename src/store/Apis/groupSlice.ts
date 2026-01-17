import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["group", " member", "create", "update", "delete"],
  endpoints: (builder) => ({
    GetAllserver: builder.query<group[], void>({
      query: () => "/",
      providesTags: ["group"],
    }),

    GetMember: builder.query({
      query: ({ id }) => id,
    }),

    Createserver: builder.mutation({
      query: ({ id, name, picture }) => ({
        url: id,
        method: "POST",
        body: { name, picture },
      }),
      invalidatesTags: ["create"],
    }),

    Updateserver: builder.mutation({
      query: ({ id, name, picture }) => ({
        url: id,
        method: "PATCH",
        body: { name, picture },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "update", id }],
    }),

    Deleteserver: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "delete",
          id,
        },
      ],
    }),

    // member apis methods
  }),
});
