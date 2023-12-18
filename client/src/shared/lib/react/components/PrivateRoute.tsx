import { Navigate } from 'react-router-dom';
import { APIStatus } from '../../../api/index';
import { useAppSelector } from '../index';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const getCurrentUserStatus = useAppSelector((state: State) => state.user.getCurrentUserStatus);
  const signInStatus = useAppSelector((state: State) => state.user.signInStatus);

  return (
    (getCurrentUserStatus === APIStatus.Fulfilled || signInStatus === APIStatus.Fulfilled)
      ? children
      : <Navigate to="/auth" />
  );
}
