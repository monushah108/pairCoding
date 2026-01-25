import { chatApi } from "./chatApi";
import { chatSocket } from "./messageSocket";

export const messageApi = chatApi.injectEndpoints({
  endpoints: (builder) => ({
    getMsg: builder.query({
      query: (chatId) => `message/${chatId}`,
      providesTags: ["msg"],
      async onCacheEntryAdded(
        chatId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;

          chatSocket.connect();

          const handleMessage = (msg: any) => {
            updateCachedData((draft) => {
              draft.push(msg);
            });
          };

          chatSocket.onMessage(handleMessage);
        } catch (err: any) {
          await cacheEntryRemoved;
          chatSocket.cleanup();
        }
      },
    }),

    sendMsg: builder.mutation({
      query: (chatId, ...body) => ({
        url: `/chat/${chatId}`,
        method: "POST",
        body: { ...body },
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
          await queryFulfilled;

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
        chatSocket.sendMessage({
          chatId,
          content,
        });
      },
    }),

    updateMsg: builder.mutation({
      query: (msgId) => ({
        url: `/msg/${msgId}`,
        method: "PATCH",
      }),
      invalidatesTags: (r, e, { msgId }) => {
        r
          ? [
              {
                type: "msg",
                ...r.map((m) => m.id == msgId),
              },
            ]
          : [{ type: "msg", msgId }];
      },
      async onQueryStarted(
        { content, chatId, msgId },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          chatApi.util.updateQueryData("getChats", chatId, (draft) => {
            const msg = draft.find((m) => m.id == msgId);
            msg.content = content;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteMsg: builder.mutation({
      query: ({ chatId, msgId }) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chat"],
      async onQueryStarted(
        { content, chatId, msgId },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          chatApi.util.updateQueryData("getChats", chatId, (draft) => {
            const msg = draft.find((m) => m.id == msgId);
            msg.content = content;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetChatsQuery,
  useDeleteMsgMutation,
  useSendMsgMutation,
  useUpdateMsgMutation,
} = messageApi;
