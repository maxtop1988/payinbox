// PayInbox — supported chains & tokens
// Customer can pay with any of these. Merchant always receives USDC on Base.

export type Token = {
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  chainName: string;
  decimals: number;
  logoColor: string; // tailwind bg color class
  logoText: string; // 1-2 letter logo
};

// Canonical USDC on Base — the settlement asset.
export const SETTLE_TOKEN = {
  symbol: "USDC",
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // native USDC on Base
  chainId: 8453,
  decimals: 6,
};

export const TOKENS: Token[] = [
  // USDC on the major L2s — easiest for customers
  { symbol: "USDC", name: "USD Coin", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", chainId: 8453, chainName: "Base", decimals: 6, logoColor: "bg-blue-500", logoText: "$" },
  { symbol: "USDC", name: "USD Coin", address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", chainId: 10, chainName: "Optimism", decimals: 6, logoColor: "bg-red-500", logoText: "$" },
  { symbol: "USDC", name: "USD Coin", address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", chainId: 42161, chainName: "Arbitrum", decimals: 6, logoColor: "bg-sky-600", logoText: "$" },
  { symbol: "USDC", name: "USD Coin", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", chainId: 137, chainName: "Polygon", decimals: 6, logoColor: "bg-purple-600", logoText: "$" },
  { symbol: "USDC", name: "USD Coin", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainId: 1, chainName: "Ethereum", decimals: 6, logoColor: "bg-gray-700", logoText: "$" },

  // Native gas tokens — for crypto-native customers
  { symbol: "ETH", name: "Ether", address: "0x0000000000000000000000000000000000000000", chainId: 8453, chainName: "Base", decimals: 18, logoColor: "bg-slate-700", logoText: "Ξ" },
  { symbol: "ETH", name: "Ether", address: "0x0000000000000000000000000000000000000000", chainId: 1, chainName: "Ethereum", decimals: 18, logoColor: "bg-slate-700", logoText: "Ξ" },
  { symbol: "ETH", name: "Ether", address: "0x0000000000000000000000000000000000000000", chainId: 42161, chainName: "Arbitrum", decimals: 18, logoColor: "bg-slate-700", logoText: "Ξ" },

  // SOL
  { symbol: "SOL", name: "Solana", address: "So11111111111111111111111111111111111111112", chainId: 1151111081099710, chainName: "Solana", decimals: 9, logoColor: "bg-gradient-to-br from-purple-500 to-green-400", logoText: "◎" },
  // USDC on Solana
  { symbol: "USDC", name: "USD Coin (Solana)", address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", chainId: 1151111081099710, chainName: "Solana", decimals: 6, logoColor: "bg-gradient-to-br from-purple-500 to-green-400", logoText: "$" },
];

export const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  10: "Optimism",
  56: "BNB Chain",
  137: "Polygon",
  8453: "Base",
  42161: "Arbitrum",
  43114: "Avalanche",
  1151111081099710: "Solana",
};

// PayInbox fee — 1% on every successful payment.
// We split the merchant's settlement amount by this fee. E.g. merchant wants $100,
// customer pays $100 worth of source tokens, we route $99 to merchant and $1 to fee wallet.
export const FEE_BPS = 100; // 1.00%
export const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_WALLET || "0x0000000000000000000000000000000000000000";
