import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { loginSelector } from '@/features/auth';
import { PrivateRoute, useAppSelector } from '@/shared/lib';
import { AppRoute } from '@/const';

const NotFoundPage = lazy(() => import('@/pages/error/notFound'));

export function AppRouter() {
  const userLogin = useAppSelector(loginSelector);

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={
          <PrivateRoute isOpen={Boolean(userLogin)}>
            <MainPage />
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.Auth}
        element={<AuthPage />}
      />

      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
