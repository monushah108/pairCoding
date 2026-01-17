import { AuthApi } from "./authApi";

export const notifyApi = AuthApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifies: builder.query({
      query: () => "getNotifies",
      providesTags: ["notification"],
    }),
    sendNotify: builder.query({
      query: (...body) => ({
        url: "/sendNotify",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["notification"],
    }),
    responseNotify: builder.query({
      query: (body) => ({
        url: "/responseNotify",
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});
