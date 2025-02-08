import { useRouteError, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ErrorPage = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.status === 505) {
      navigate('/error-505');
    } else if (error?.status === 500) {
      navigate('/error-500');
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600 mb-4">{error?.status ? `Error ${error.status}` : 'Oops! Something went wrong'}</h1>
      <p className="text-gray-600">{error?.message || 'An unexpected error occurred'}</p>
    </div>
  );
};

export default ErrorPage;