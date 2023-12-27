import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const';

interface IPrivateRoute {
  isOpen: boolean;
  children: JSX.Element;
}

export function PrivateRoute({ isOpen, children }: IPrivateRoute) {
  return isOpen ? children : <Navigate to={AppRoute.Auth} />;
}
