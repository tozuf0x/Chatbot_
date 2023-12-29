import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery, getAuthToken, dropAuthToken, saveAuthToken } from '@/shared/api';
import { changeNotification, redirectToRoute } from '@/shared/lib';
import { setLogin } from '../model/authSlice';
import { ApiRoute, API_URL, AppRoute } from '@/const';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
    headers: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IAuthData, null>({
      queryFn: async (_args, _baseQueryApi, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: '/users/1',
          method: 'GET',
        });

        if (response.error) {
          return { error: response.error };
        }

        return { data: response.data as IAuthData };
      },
    }),
    login: builder.mutation<IAuthResponse, IAuthData>({
      queryFn: async (body, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: ApiRoute.Login,
          method: 'POST',
          data: body,
        });

        if (response.error) {
          dispatch(
            changeNotification({
              type: 'error',
              title: 'Ошибка!',
              text: 'Не удалось авторизоваться',
            })
          );

          return { error: response.error };
        }

        saveAuthToken((response.data as IAuthResponse).accessToken);
        dispatch(setLogin((response.data as IAuthResponse).user.email));
        dispatch(redirectToRoute(AppRoute.Root));

        return { data: response.data as IAuthResponse };
      },
    }),
    logout: builder.mutation<IAuthData, null>({
      queryFn: async (_args, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: ApiRoute.Logout,
          method: 'DELETE',
        });

        if (response.error) {
          dispatch(
            changeNotification({
              type: 'error',
              title: 'Ошибка!',
              text: 'Не удалось разлогиниться',
            })
          );

          return { error: response.error };
        }

        dropAuthToken();
        dispatch(setLogin(null));

        return { data: response.data as IAuthData };
      },
    }),
  }),
});
