import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayInbox — One payment link. Any token, any chain. Settles in USDC.",
  description: "Create a payment link. Your customer pays in any token on any chain. You receive USDC on Base. 1% fee. Built on x402 + LI.FI.",
  metadataBase: new URL("https://payinbox.app"),
  openGraph: {
    title: "PayInbox",
    description: "One payment link. Any token, any chain. Settles in USDC.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
