"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import {
  CHECK_AUTH_REQUEST,
  checkAuthRequest,
} from "@/store/auth/actions/action";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark"]}
          value={{
            light: "light",
            dark: "dark",
          }}
        >
          <Toaster richColors closeButton expand={false} className="w-[20vw]" />

          <Toaster richColors closeButton expand={false} className="w-[20vw]" />
          <AuthChecker>{children}</AuthChecker>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function AuthChecker({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/auth/sign-in") {
      dispatch({ type: CHECK_AUTH_REQUEST });
    }
  }, [dispatch, pathname]);

  return <>{children}</>;
}
