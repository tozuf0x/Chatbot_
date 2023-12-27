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

export const FIRST_FILTER_NAME = 'Не выбрана';
