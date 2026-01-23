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
    register: builder.mutation({
      query: (body) => ({
        url: "/register",

        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (...body) => ({
        url: "/login",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, useRegisterMutation, useLoginMutation } =
  AuthApi;
