import { AUTH_TOKEN_KEY_NAME } from '@/const';

export const saveAuthToken = (tokenValue: AuthToken) => localStorage.setItem(AUTH_TOKEN_KEY_NAME, tokenValue);
