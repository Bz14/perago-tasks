import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Position, OrganizationNode } from "@/app/interfaces/interface";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const positionApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["Choices", "Position"],
  endpoints: (build) => ({
    createPosition: build.mutation({
      query: (data) => ({
        url: "/position",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: Position; message: string }) =>
        response.data,

      invalidatesTags: ["Choices", "Position"],
    }),

    getPositions: build.query({
      query: () => "/positions",

      transformResponse: (response: {
        data: OrganizationNode[];
        message: string;
      }) => response.data,

      providesTags: ["Position"],
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

      providesTags: ["Position"],
    }),

    updatePosition: build.mutation({
      query: ({ id, name, description }) => ({
        url: `/position/${id}`,
        method: "PUT",
        body: { name, description },
      }),
      transformResponse: (response: { data: Position; message: string }) =>
        response.data,
      invalidatesTags: ["Choices", "Position"],
    }),

    deletePosition: build.mutation({
      query: (id) => ({
        url: `/position/${id}`,
        method: "DELETE",
      }),

      transformResponse: (response: { data: Position; message: string }) =>
        response.data,
      invalidatesTags: ["Choices", "Position"],
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
