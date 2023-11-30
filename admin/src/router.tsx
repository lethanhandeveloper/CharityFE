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
const MapPage = Loader(lazy(() => import('@pages/map')));
const UserPage = Loader(lazy(() => import('@pages/user')));
const ProvincePage = Loader(lazy(() => import('@pages/province')));
const DistrictPage = Loader(lazy(() => import('@pages/district')));
const CommunePage = Loader(lazy(() => import('@pages/commune')));
const DashboardPage = Loader(lazy(() => import('@pages/dashboards/Crypto')));
const routers: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'user/active',
        element: <UserPage isActive={true} />,
      },
      {
        path: 'user/inactive',
        element: <UserPage isActive={false} />,
      },
      {
        path: 'province',
        element: <ProvincePage isActive={false} />,
      },
      {
        path: 'district',
        element: <DistrictPage isActive={false} />,
      },
      {
        path: 'commune',
        element: <CommunePage isActive={false} />,
      },
    ],
  },

  { path: '/login', element: <LoginPage /> },

  {
    path: '*',
    element: <ErrorRouter />,
  },
];
export default routers;
