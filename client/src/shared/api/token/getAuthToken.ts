import { AUTH_TOKEN_KEY_NAME } from '@/const';

export const getAuthToken = (): AuthToken => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
