import { AUTH_TOKEN_KEY_NAME } from '@/const';

export const dropAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
