const AUTH_TOKEN_KEY_NAME = process.env.VITE_AUTH_TOKEN_KEY_NAME as string;

export const getAuthToken = (): AuthToken => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
