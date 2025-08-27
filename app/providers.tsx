"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const stripePromisePublishable = loadStripe("pk_test_51RjScLPxJdDxkdGynSggIo0LuUl1A2RgYUDQKPvlrlerelCKCd7eni3Rq8WqO7rax747T3igMcf8Zac5Yzd9AF3E0091iHltuh"); // <-- replace with your real key

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps} attribute="class" enableSystem={false}>
          <Elements stripe={stripePromisePublishable}>
            {children}
          </Elements>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}