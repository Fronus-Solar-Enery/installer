import { lazy } from 'react';
const Home = lazy(() => import('@/pages'));
const Register = lazy(() => import('@/pages/register'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const ERROR404 = lazy(() => import('@/pages/Error404'));

const routes = [
  {
    path: '/',
    element: <Home />,
    layout: 'main',
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    layout: 'main',
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ERROR404 />,
    layout: 'main',
  },
];

export { routes };