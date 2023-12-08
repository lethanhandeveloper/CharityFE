import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

import SuspenseLoader from '@components/SuspenseLoader';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);
const MainLayout = Loader(lazy(() => import('@layout/index')));
const HomePage = Loader(lazy(() => import('@pages/home')));
const MapPage = Loader(lazy(() => import('@pages/map')));
const IntroductionPage = Loader(lazy(() => import('@pages/introduction')));
const DonatePage = Loader(lazy(() => import('@pages/campaign/donate')));
const LoginPage = Loader(lazy(() => import('@pages/auth/login')));
const RegisterPage = Loader(lazy(() => import('@pages/auth/register')));
const ErrorRouter = Loader(lazy(() => import('@pages/error/ErrorRouter')));
const ManagementUserProfile = Loader(lazy(() => import('@pages/profile')));
const CampainFormPage = Loader(lazy(() => import('@pages/campaign/create')));
const CampainPage = Loader(lazy(() => import('@pages/campaign/')));
const RoleUpdate = Loader(lazy(() => import('@pages/auth/updateRole')));
const ConsultantPage = Loader(lazy(() => import('@pages/consultant')));
const CampaignCurrentPage = Loader(lazy(() => import('@pages/consultant/campaignTable')));
const routers: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'introduction', element: <IntroductionPage /> },
      { path: 'profile', element: <ManagementUserProfile /> },
      { path: 'campaign/create', element: <CampainFormPage /> },
      { path: 'campaign', element: <CampainPage /> },
      {
        path: 'campaign/current',
        element: (
          <CampaignCurrentPage
            id=''
            isCurrent={true}
          />
        ),
      },
      { path: 'campaign/donate/:id', element: <DonatePage /> },
      { path: 'register/account/fund', element: <RoleUpdate /> },
      { path: 'account/:id', element: <ConsultantPage /> },
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

  {
    path: '*',
    element: <ErrorRouter />,
  },
];
export default routers;
