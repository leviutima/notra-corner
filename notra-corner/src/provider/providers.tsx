"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ChangeSearchProvider } from "@/context/useChangeSearchContext";
import {
  CHECK_AUTH_REQUEST,
  checkAuthRequest,
} from "@/store/auth/actions/action";
import { store } from "@/store/store";
import { DndContext } from "@dnd-kit/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
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
        <ChangeSearchProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark"]}
            value={{
              light: "light",
              dark: "dark",
            }}
          >
            <Toaster
              richColors
              closeButton
              expand={false}
              className="w-[20vw]"
            />

            <Toaster
              richColors
              closeButton
              expand={false}
              className="w-[20vw]"
            />
            <AuthChecker>{children}</AuthChecker>
          </ThemeProvider>
        </ChangeSearchProvider>
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
