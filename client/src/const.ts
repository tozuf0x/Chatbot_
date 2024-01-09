export const API_URL = process.env.VITE_API_URL as string;
export const AUTH_TOKEN_KEY_NAME = process.env.VITE_AUTH_TOKEN_KEY_NAME as string;

export enum AppRoute {
  Root = '/',
  Auth = '/auth',
  NotFound = '*',
}

export enum ApiRoute {
  Guidances = '/guidances',
  Login = '/login',
  Logout = '/logout',
}

export enum Mode {
  Idle = 'idle',
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}
