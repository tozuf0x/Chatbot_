import { authApi, setLogin } from '@/features/auth';
import { useAppDispatch, Notification } from '@/shared/lib';
import { Loader } from '@/shared/ui';
import { AppRouter } from './AppRouter';
import { withProviders } from './providers';

function App() {
  const dispatch = useAppDispatch();
  const { data, isUninitialized, isLoading, isSuccess } = authApi.useGetCurrentUserQuery(null);

  if (isUninitialized || isLoading) {
    return <Loader fullPage />;
  }

  if (data && isSuccess) {
    dispatch(setLogin(data.email));
  }

  return (
    <>
      <Notification />
      <AppRouter />
    </>
  );
}

const appWithProviders = withProviders(App);

export default appWithProviders;
