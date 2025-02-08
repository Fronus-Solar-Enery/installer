import { PropsWithChildren, Suspense } from 'react';
import App from '../App';


const Main = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <main className="flex relative">
            <Suspense>{children}</Suspense>
      </main>
    </App>
  );
};

export default Main;