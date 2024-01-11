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
const UserPage = Loader(lazy(() => import('@pages/user')));
const MapPage = Loader(lazy(() => import('@pages/map')));

const ProvincePage = Loader(lazy(() => import('@pages/province')));
const DistrictPage = Loader(lazy(() => import('@pages/district')));
const CommunePage = Loader(lazy(() => import('@pages/commune')));
const DashboardPage = Loader(lazy(() => import('@pages/dashboards/Crypto')));
const CampaignPage = Loader(lazy(() => import('@pages/campaign')));
const BannerPage = Loader(lazy(() => import('@pages/banner')));
const RequestPage = Loader(lazy(() => import('@pages/request')));
const FeedbackPage = Loader(lazy(() => import('@pages/feedback')));
const routers: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: 'statistical',
        element: <DashboardPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'user/',
        children: [
          {
            path: 'active',
            element: <UserPage isActive={true} />,
          },
          {
            path: 'inactive',
            element: <UserPage isActive={false} />,
          },
        ],
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
      {
        path: 'campaign/pending',
        element: (
          <CampaignPage
            isActive={false}
            status='DRAFT'
          />
        ),
      },
      {
        path: 'campaign/end',
        element: (
          <CampaignPage
            isActive={false}
            status='END'
          />
        ),
      },
      {
        path: 'campaign/cancel',
        element: (
          <CampaignPage
            isActive={false}
            status='CANCEL'
          />
        ),
      },
      {
        path: 'campaign/start',
        element: (
          <CampaignPage
            isActive={false}
            status='START'
          />
        ),
      },
      {
        path: 'banner',
        element: <BannerPage isActive={false} />,
      },
      {
        path: 'request/origin',
        element: <RequestPage isActive={false} />,
      },
      {
        path: 'request/personl',
        element: <RequestPage isActive={false} />,
      },
      {
        path: 'request/done',
        element: <RequestPage isActive={true} />,
      },
      {
        path: 'feedback',
        element: <FeedbackPage isActive={false} />,
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
