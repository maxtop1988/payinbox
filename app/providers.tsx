"use client";

import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { wagmiAdapter, projectId, networks, metadata } from "@/lib/appkit-config";

let _appKit: ReturnType<typeof createAppKit> | null = null;
function ensureAppKit() {
  if (_appKit) return _appKit;
  _appKit = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    metadata,
    features: {
      analytics: false,
      email: false,
      socials: false,
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#22d3ee",
    },
  });
  return _appKit;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  // Eager-init the AppKit singleton on mount.
  if (typeof window !== "undefined") ensureAppKit();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
