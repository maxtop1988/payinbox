// In-memory link store. Replace with Vercel Postgres or Supabase for production.
// In dev / single-instance serverless, this is fine for the demo.

import { nanoid } from "nanoid";

export type PaymentLink = {
  id: string;
  secret: string; // manage URL token
  amount: string; // decimal string, e.g. "100.00"
  currency: "USDC"; // merchant always receives USDC
  settleChainId: number;
  settleTokenAddress: string;
  recipientWallet: string; // merchant's wallet
  description: string;
  status: "active" | "paid" | "expired";
  createdAt: number;
  paidAt?: number;
  paidTxHash?: string;
  paidBy?: string;
  paidFromToken?: string;
  paidFromChain?: number;
  paidFromAmount?: string;
};

// Module-level Map. In Vercel serverless this only lives per cold start — fine for demo.
const store = new Map<string, PaymentLink>();

// Seed with one demo link so the landing page has a live example.
if (store.size === 0) {
  const id = "demo";
  store.set(id, {
    id,
    secret: "demo-secret",
    amount: "10.00",
    currency: "USDC",
    settleChainId: 8453,
    settleTokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    recipientWallet: "0x0000000000000000000000000000000000000000",
    description: "Demo link — try paying with any token, see it settle in USDC on Base.",
    status: "active",
    createdAt: Date.now(),
  });
}

export function createLink(input: Omit<PaymentLink, "id" | "secret" | "status" | "createdAt">): PaymentLink {
  const id = nanoid(10);
  const secret = nanoid(24);
  const link: PaymentLink = {
    ...input,
    id,
    secret,
    status: "active",
    createdAt: Date.now(),
  };
  store.set(id, link);
  return link;
}

export function getLink(id: string): PaymentLink | undefined {
  return store.get(id);
}

export function listLinksBySecret(secret: string): PaymentLink[] {
  return Array.from(store.values()).filter((l) => l.secret === secret);
}

export function markPaid(id: string, txHash: string, paidBy: string, fromToken: string, fromChain: number, fromAmount: string) {
  const l = store.get(id);
  if (!l) return;
  l.status = "paid";
  l.paidAt = Date.now();
  l.paidTxHash = txHash;
  l.paidBy = paidBy;
  l.paidFromToken = fromToken;
  l.paidFromChain = fromChain;
  l.paidFromAmount = fromAmount;
  store.set(id, l);
}

export function allLinks(): PaymentLink[] {
  return Array.from(store.values()).sort((a, b) => b.createdAt - a.createdAt);
}
