import { AuthApi } from "./authApi";

export const UserApi = AuthApi.injectEndpoints({
  endpoints: (builder) => ({
    allFriends: builder.query({
      query: () => "/friends",
      providesTags: ["friend"],
    }),
    searchUser: builder.query({
      query: (...body) => ({
        url: "/search",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["friend"],
    }),
  }),
});
