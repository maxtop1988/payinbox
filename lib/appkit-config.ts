// Shared config for Reown AppKit + wagmi.
// Centralized here so server and client both have access.

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, base, arbitrum, optimism, polygon, solana } from "@reown/appkit/networks";
import { cookieStorage, createStorage, http } from "wagmi";

export const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "demo-reown-payinbox-placeholder";

// Networks PayInbox supports for the public pay page (customer side).
// AppKit's v1 network tuple type fights with wagmi v3; cast to any at the boundary.
export const networks: any = [base, mainnet, arbitrum, optimism, polygon, solana];

export const metadata = {
  name: "PayInbox",
  description: "One payment link. Any token, any chain. Settles in USDC.",
  url: typeof window !== "undefined" ? window.location.origin : "https://payinbox.app",
  icons: ["https://payinbox.app/icon.png"],
};

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks: networks as any,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
