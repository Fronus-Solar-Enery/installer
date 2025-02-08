import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';

// Tailwind css
import './index.css';
import './serviceWorker';

// Router
import { RouterProvider } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { ThemeProvider } from './ThemeProvider';
import { store } from './store';
import router from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <Provider store={store}>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
);