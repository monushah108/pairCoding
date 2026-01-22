import { AuthApi } from "./authApi";

export const UserApi = AuthApi.injectEndpoints({
  endpoints: (builder) => ({
    allFriends: builder.query({
      query: () => "/friend",
      providesTags: ["friend"],
    }),
    searchUser: builder.query({
      query: (Searchq, ...body) => ({
        url: "/friend",
        params: { search: Searchq },
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["friend"],
    }),
  }),
});

export const { useAllFriendsQuery } = UserApi;
