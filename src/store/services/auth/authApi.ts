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
  tagTypes: ["user", "friend", "notification"],
  endpoints: (builder) => ({
    getUser: builder.query<user[], void>({
      query: () => "/profile",
      providesTags: ["user"],
    }),
    registerUser: builder.query({
      query: ({ ...body }) => ({
        url: "/register",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.query({
      query: ({ ...body }) => ({
        url: "/login",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
