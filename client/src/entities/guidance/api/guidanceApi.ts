import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute } from '@/const';

const API_URL = process.env.VITE_API_URL;

export const guidanceApi = createApi({
  reducerPath: 'guidanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllGuidances: builder.query<IGuidanceData[], null>({
      query: () => ({
        url: ApiRoute.Guidances,
      }),
    }),
  }),
});
