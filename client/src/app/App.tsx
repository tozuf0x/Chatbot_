
import { AppRouter } from './AppRouter';
import { withProviders } from './providers';

function App() {
  return (
    <AppRouter />
  );
}

const appWithProviders = withProviders(App);

export default appWithProviders;
