import { AUTH_TOKEN_KEY_NAME } from '../const';

export const dropToken = () => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
