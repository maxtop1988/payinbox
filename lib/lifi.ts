// LI.FI REST API client (no key required for low rate).
// Used server-side to compute quotes for the public pay page.
// See https://docs.li.fi/llms.txt

const BASE = "https://li.quest/v1";

export type Quote = {
  id: string;
  type: string;
  tool: string;
  action: {
    fromChainId: number;
    toChainId: number;
    fromToken: { symbol: string; address: string; decimals: number; chainId: number; name: string };
    toToken: { symbol: string; address: string; decimals: number; chainId: number; name: string };
    fromAmount: string;
    slippage: number;
  };
  estimate: {
    fromAmount: string;
    toAmount: string; // raw integer, in toToken decimals
    toAmountMin: string;
    approvalAddress: string;
    executionDuration: number; // seconds
    gasCosts: Array<{ type: string; estimate: string; amount: string; amountUSD?: string; token: { symbol: string } }>;
  };
  transactionRequest: {
    to: string;
    data: string;
    value: string;
    from: string;
    chainId: number;
    gasLimit: string;
    gasPrice: string;
  };
};

export async function getQuote(params: {
  fromChainId: number;
  fromTokenAddress: string;
  fromAddress: string;
  toChainId: number;
  toTokenAddress: string;
  toAddress: string;
  fromAmount: string; // raw integer in fromToken decimals
  fromAmountDecimals: number;
  toAmountDecimals: number;
  slippage?: number;
}): Promise<Quote> {
  const usp = new URLSearchParams({
    fromChain: String(params.fromChainId),
    toChain: String(params.toChainId),
    fromToken: params.fromTokenAddress,
    toToken: params.toTokenAddress,
    fromAmount: params.fromAmount,
    fromAddress: params.fromAddress,
    toAddress: params.toAddress,
    slippage: String(params.slippage ?? 0.005),
  });
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LIFI_API_KEY) headers["x-lifi-api-key"] = process.env.LIFI_API_KEY;
  const res = await fetch(`${BASE}/quote?${usp.toString()}`, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LI.FI quote failed ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getStatus(txHash: string, bridge: string, fromChain: number, toChain: number) {
  const usp = new URLSearchParams({ txHash, bridge, fromChain: String(fromChain), toChain: String(toChain) });
  const res = await fetch(`${BASE}/status?${usp.toString()}`);
  if (!res.ok) throw new Error(`LI.FI status failed ${res.status}`);
  return res.json();
}
