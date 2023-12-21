import { AUTH_TOKEN_KEY_NAME } from '../const';

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
