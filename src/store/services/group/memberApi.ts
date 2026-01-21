import { GroupApi } from "./groupApi";

export const MemberApi = GroupApi.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query({
      query: (id) => `${id}/members`,
      providesTags: (result, error, id) => [{ type: "Member", id }],
    }),
  }),
});

export const { useGetMemberQuery } = MemberApi;
