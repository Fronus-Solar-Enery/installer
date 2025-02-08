import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import Dashboard from '@/layout/main';

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.layout === 'main' ? <Dashboard>{route.element}</Dashboard> : '',
  };
});

const router = createBrowserRouter(finalRoutes, {
  future: {
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
  },
});

export default router;