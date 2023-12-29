import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

interface IAxiosBaseQuery {
  baseUrl?: string;
  headers?: (headers: { [key: string]: string }) => { [key: string]: string };
}

interface IBaseQueryFn {
  url: string;
  params?: { [key: string]: string | number };
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
}

export const axiosBaseQuery =
  ({
    baseUrl = '',
    headers,
  }: IAxiosBaseQuery): BaseQueryFn<IBaseQueryFn, unknown, unknown> =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          ...(params && { params: params }),
          ...(headers && { headers: headers({}) }),
          method,
          data: data as unknown,
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
