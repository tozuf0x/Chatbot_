import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '@/shared/api';
import { ApiRoute } from '@/const';

const API_URL = process.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IAuthData, null>({
      query: () => ({
        url: '/users/1',
      }),
    }),
    login: builder.mutation<IAuthResponse, IAuthData>({
      query: (body) => ({
        url: ApiRoute.Login,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    logout: builder.mutation<IAuthData, null>({
      query: () => ({
        url: ApiRoute.Logout,
        method: 'DELETE',
      }),
    }),
  }),
});
