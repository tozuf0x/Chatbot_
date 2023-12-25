const AUTH_TOKEN_KEY_NAME = process.env.VITE_AUTH_TOKEN_KEY_NAME as string;

export const saveAuthToken = (tokenValue: AuthToken) => localStorage.setItem(AUTH_TOKEN_KEY_NAME, tokenValue);
