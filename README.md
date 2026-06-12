# PayInbox

**The Zernio of crypto payments.** One payment link. Any token, any chain. Settles in USDC on Base.

## What it does

Merchant creates a payment link with an amount + their USDC wallet. Customer clicks the link, picks whatever token they have (USDC on Polygon, ETH on Base, SOL, etc.), and pays. We bridge to USDC on Base. 1% fee.

## Stack

- **Next.js 16** (app router, TypeScript, Tailwind)
- **Reown AppKit** — wallet connector (WalletConnect v2)
- **@lifi/widget** — cross-chain bridging + token picker + payment execution
- **x402** — every pay link is also a 402 Payment Required endpoint, payable by AI agents

## Why this wins

The x402 agent economy is doing 75M+ transactions and $24M+ in monthly volume (per x402.org). 22K active sellers. Most are developers with raw API endpoints. **No friendly UI exists for non-developers or for simple "I want to get paid" use cases.** PayInbox is that missing UI.

Pricing: 1% per payment. Example: $100 payment → $99 to merchant, $1 to PayInbox.

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```

## Deploy

```bash
vercel --prod
```

Set env vars on Vercel:
- `NEXT_PUBLIC_REOWN_PROJECT_ID` — free at https://dashboard.reown.com
- `LIFI_API_KEY` — optional, for higher LI.FI rate limits
- `NEXT_PUBLIC_FEE_WALLET` — address that receives the 1% fee (your wallet)
