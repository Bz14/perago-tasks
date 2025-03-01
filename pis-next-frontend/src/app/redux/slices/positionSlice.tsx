import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Position } from "@/app/interfaces/interface";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const positionApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["Choices"],
  endpoints: (build) => ({
    createPosition: build.mutation({
      query: (data) => ({
        url: "/position",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },

      invalidatesTags: ["Choices"],
    }),

    getPositions: build.query({
      query: () => "/positions",

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),

    getPositionById: build.query({
      query: (id) => `/position/${id}`,

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),

    updatePosition: build.mutation({
      query: ({ id, name, description }) => ({
        url: `/position/${id}`,
        method: "PUT",
        body: { name, description },
      }),

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),

    deletePosition: build.mutation({
      query: (id) => ({
        url: `/position/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          positionApi.util.updateQueryData(
            "getPositions",
            undefined,
            (draft) => {
              return draft.filter((p: Position) => p.id !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          result.undo();
        }
      },
    }),

    getChoices: build.query({
      query: () => "/choices",

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.log(error);
          return error;
        }
      },

      providesTags: ["Choices"],
    }),
  }),
});

export const {
  useCreatePositionMutation,
  useGetPositionsQuery,
  useGetPositionByIdQuery,
  useUpdatePositionMutation,
  useDeletePositionMutation,
  useGetChoicesQuery,
} = positionApi;
