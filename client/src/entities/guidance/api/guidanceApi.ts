import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, FIRST_FILTER_NAME } from '@/const';

const API_URL = process.env.VITE_API_URL;

export const guidanceApi = createApi({
  reducerPath: 'guidanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Guidance'],
  endpoints: (builder) => ({
    getAllGuidances: builder.query<IGuidanceData[], null>({
      query: () => ({
        url: ApiRoute.Guidances,
      }),
      transformResponse: (response: IGuidanceData[]) =>
        response.map((item: IGuidanceData) =>
          item.appliedArea === ''
            ? { ...item, appliedArea: FIRST_FILTER_NAME }
            : item
        ),
      providesTags: (result) => ['Guidance'],
    }),
    addGuidance: builder.mutation<IGuidanceData, IGuidanceData>({
      query: (body) => ({
        url: ApiRoute.Guidances,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Guidance'],
    }),
    editGuidance: builder.mutation<IGuidanceData, { oldId: string; body: IGuidanceData }>({
      query: ({ oldId, body }) => ({
        url: `${ApiRoute.Guidances}/${oldId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Guidance'],
    }),
  }),
});
