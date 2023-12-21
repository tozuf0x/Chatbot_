export const API_URL = process.env.VITE_API_URL as string;
export const AUTH_TOKEN_KEY_NAME = process.env.VITE_AUTH_TOKEN_KEY_NAME as string;
export const REQUEST_TIMEOUT = 5000;

export enum APIStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}
