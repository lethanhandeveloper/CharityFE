import SuspenseLoader from '@components/SuspenseLoader';

import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);
const SidebarLayout = Loader(lazy(() => import('@layout/SidebarLayout')));
const LoginPage = Loader(lazy(() => import('@pages/auth/login')));
const ErrorRouter = Loader(lazy(() => import('@pages/Status/Status404')));
const routers: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [],
  },

  { path: '/login', element: <LoginPage /> },

  {
    path: '*',
    element: <ErrorRouter />,
  },
];
export default routers;
