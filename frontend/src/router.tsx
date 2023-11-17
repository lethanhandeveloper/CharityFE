import SuspenseLoader from '@components/SuspenseLoader';
import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);
const MainLayout = Loader(lazy(() => import('@layout/index')));

const HomePage = Loader(lazy(() => import('@pages/home')));
const MapPage = Loader(lazy(() => import('@pages/map')));
const IntroductionPage = Loader(lazy(() => import('@pages/introduction')));
const DonatePage = Loader(lazy(() => import('@pages/donate')));
const LoginPage = Loader(lazy(() => import('@pages/auth/login')));
const RegisterPage = Loader(lazy(() => import('@pages/auth/register')));

const routers: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'introduction', element: <IntroductionPage /> },
      { path: 'donate', element: <DonatePage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
export default routers;
