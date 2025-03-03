import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["Admin"],
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        data: { id: string; userName: string };
        message: string;
      }) => response.data,
    }),
  }),
});

export const { useCreateAdminMutation } = adminApi;
