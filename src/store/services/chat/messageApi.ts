import { chatApi } from "./chatApi";
import { chatSocket } from "./chatSocket";

export const messageApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    getMsg: builder.query({
      query: (chatId) => `message/${chatId}`,
      providesTags: ["msg"],
    }),

    sendMsg: builder.mutation({
      query: (channelId, ...body) => ({
        url: "/chat",
        method: "POST",
        body: { ...body },
        params: { channelId },
      }),
      invalidatesTags: ["chat"],
      async onQueryStarted(
        { content, chatId, senderId },
        { dispatch, queryFulfilled },
      ) {
        const Id = crypto.randomUUID();
        const patchResult = dispatch(
          chatApi.util.updateQueryData("getMsg", chatId, (draft) => {
            draft.push({
              Id,
              content,
              chatId,
              senderId,
            });
          }),
        );

        try {
          const data = await queryFulfilled;

          dispatch(
            chatApi.util.updateQueryData("getMsg", chatId, (draft) => {
              const msg = draft.find((m) => m.id == Id);
            }),
          );
        } catch (err: any) {
          patchResult.undo();
        }
      },
      queryFn: async ({ chatId, content }) => {
        chatSocket.sendmsg({
          chatId,
          content,
        });
      },
    }),
  }),
});
