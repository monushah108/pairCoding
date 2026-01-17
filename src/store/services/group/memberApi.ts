import { groupApi } from "./group/groupApi";

export const MemberApi = groupApi.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query<Member[], String>({
      query: (id) => `${id}/member`,
      providesTags: (result, error, id) => [{ type: "Member", id }],
    }),
  }),
});
