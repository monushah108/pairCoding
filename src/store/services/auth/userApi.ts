import { AuthApi } from "./authApi";

export const UserApi = AuthApi.injectEndpoints({
  endpoints: (builder) => ({
    allFriends: builder.query({
      query: () => "/friend",
      providesTags: ["friend"],
    }),
    searchUser: builder.mutation({
      query: (Searchq, ...body) => ({
        url: "/friend",
        params: { search: Searchq },
        method: "POST",
        body: { ...body },
      }),

      invalidatesTags: ["friend"],
    }),
    sendFriendRequest: builder.mutation({
      query: (nickName) => ({
        url: "/friend",
        method: "POST",
        params: { nickName },
      }),
      invalidatesTags: ["friend"],
    }),
    onRequest: builder.mutation({
      query: ({ id, status }) => ({
        url: `/friend/${id}`,
        method: "PATCH",
        params: { status },
      }),

      invalidatesTags: ["friend"],
    }),
    removeFriend: builder.mutation({
      query: (id) => ({
        url: `/friend/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["friend"],
    }),
  }),
});

export const {
  useAllFriendsQuery,
  useSearchUserMutation,
  useSendFriendRequestMutation,
  useRemoveFriendMutation,
  useOnRequestMutation,
} = UserApi;
