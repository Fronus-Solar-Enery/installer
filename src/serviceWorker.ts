// src/serviceWorkerUnregister.ts
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.getRegistrations().then((registrations: readonly ServiceWorkerRegistration[]) => {
        registrations.forEach((registration) => registration.unregister());
      });
    });
  }
  