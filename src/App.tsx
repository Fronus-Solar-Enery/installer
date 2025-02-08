import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

function App({ children }: PropsWithChildren) {

  return (
    <div className="antialiased relative">
      <div className="relative">
        {children}
        {/* <Toaster toastOptions={{ className: 'my-toast' }} position="top-center" richColors /> */}
      </div>
    </div>
  );
}

export default App;