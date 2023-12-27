const AUTH_TOKEN_KEY_NAME = process.env.VITE_AUTH_TOKEN_KEY_NAME as string;

export const dropAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
