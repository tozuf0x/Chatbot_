
import { Notification } from '@/shared/lib';
import { AppRouter } from './AppRouter';
import { withProviders } from './providers';

function App() {
  return (
    <>
      <Notification />
      <AppRouter />
    </>
  );
}

const appWithProviders = withProviders(App);

export default appWithProviders;
