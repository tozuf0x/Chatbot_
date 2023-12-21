import { AUTH_TOKEN_KEY_NAME } from '../const';

export const saveToken = (tokenValue: Token) => localStorage.setItem(AUTH_TOKEN_KEY_NAME, tokenValue);
