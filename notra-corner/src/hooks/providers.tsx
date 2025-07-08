// src/app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {

 const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 3,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton expand={false} className='w-[20vw]'/>
      {children}
    </QueryClientProvider>
  );
}
