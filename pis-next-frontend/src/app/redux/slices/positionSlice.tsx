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

      transformResponse: (response: { data: Position; message: string }) =>
        response.data,

      invalidatesTags: ["Choices"],
    }),

    getPositions: build.query({
      query: () => "/positions",

      transformResponse: (response: { data: Position[]; message: string }) =>
        response.data,
    }),

    getPositionById: build.query({
      query: (id) => `/position/${id}`,

      transformResponse: (response: {
        data: {
          name: string;
          description: string;
          parentId: string;
          children: { id: string; name: string }[];
        };
        message: string;
      }) => response.data,
    }),

    updatePosition: build.mutation({
      query: ({ id, name, description }) => ({
        url: `/position/${id}`,
        method: "PUT",
        body: { name, description },
      }),
      transformResponse: (response: { data: Position; message: string }) =>
        response.data,
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
      query: () => "/position/choices",
      transformResponse: (response: {
        data: { value: string; label: string }[];
        message: string;
      }) => response.data,

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
