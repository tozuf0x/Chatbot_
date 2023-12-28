import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api';
import { changeNotification } from '@/shared/lib';
import { ApiRoute, FIRST_FILTER_NAME, API_URL } from '@/const';

export const guidanceApi = createApi({
  reducerPath: 'guidanceApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Guidance'],
  endpoints: (builder) => ({
    getAllGuidances: builder.query<IGuidanceData[], null>({
      queryFn: async (_args, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: ApiRoute.Guidances,
          method: 'GET',
        });

        if (response.error) {
          dispatch(
            changeNotification({
              type: 'error',
              title: 'Ошибка!',
              text: 'Не удалось загрузить записи таблицы',
            })
          );

          return { error: response.error };
        }

        const tranformedData = (response.data as IGuidanceData[]).map((item) =>
          item.appliedArea === '' ? { ...item, appliedArea: FIRST_FILTER_NAME } : item
        );

        return { data: tranformedData };
      },
      providesTags: ['Guidance'],
    }),
    addGuidance: builder.mutation<IGuidanceData, IGuidanceData>({
      queryFn: async (body, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: ApiRoute.Guidances,
          method: 'POST',
          data: body,
        });

        if (response.error) {
          dispatch(
            changeNotification({
              type: 'error',
              title: 'Ошибка!',
              text: 'Не удалось добавить новую запись',
            })
          );

          return { error: response.error };
        }

        dispatch(
          changeNotification({
            type: 'success',
            title: 'Успех!',
            text: 'Запись была успешно добавлена',
          })
        );

        return { data: response.data as IGuidanceData };
      },
      invalidatesTags: ['Guidance'],
    }),
    editGuidance: builder.mutation<IGuidanceData, { oldId: string; body: IGuidanceData }>(
      {
        queryFn: async ({ oldId, body }, { dispatch }, _extraOptions, baseQuery) => {
          const response = await baseQuery({
            url: `${ApiRoute.Guidances}/${oldId}`,
            method: 'PUT',
            data: body,
          });

          if (response.error) {
            dispatch(
              changeNotification({
                type: 'error',
                title: 'Ошибка!',
                text: 'Не удалось отредактировать запись',
              })
            );

            return { error: response.error };
          }

          dispatch(
            changeNotification({
              type: 'success',
              title: 'Успех!',
              text: 'Запись была успешно отредактирована',
            })
          );

          return { data: response.data as IGuidanceData };
        },
        invalidatesTags: ['Guidance'],
      }
    ),
    deleteGuidance: builder.mutation<IGuidanceData, string>({
      queryFn: async (id, { dispatch }, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: `${ApiRoute.Guidances}/${id}`,
          method: 'DELETE',
          data: id,
        });

        if (response.error) {
          dispatch(
            changeNotification({
              type: 'error',
              title: 'Ошибка!',
              text: 'Не удалось удалить запись',
            })
          );

          return { error: response.error };
        }

        dispatch(
          changeNotification({
            type: 'success',
            title: 'Успех!',
            text: 'Запись была успешно удалена',
          })
        );

        return { data: response.data as IGuidanceData };
      },
      invalidatesTags: ['Guidance'],
    }),
  }),
});
