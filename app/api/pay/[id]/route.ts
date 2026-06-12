// GET /api/pay/[id] — x402-compatible endpoint for AI agents.
// Returns HTTP 402 Payment Required with the payment details in headers,
// and a JSON body with payment instructions.

import { NextRequest, NextResponse } from "next/server";
import { getLink, markPaid } from "@/lib/db";
import { SETTLE_TOKEN } from "@/lib/chains";
import { getStatus } from "@/lib/lifi";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = getLink(id);
  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (link.status === "paid") {
    return NextResponse.json({
      paid: true,
      txHash: link.paidTxHash,
    });
  }

  // Apply 1% fee
  const requestedUsd = Number(link.amount);
  const merchantReceives = (requestedUsd * 0.99).toFixed(2);
  const merchantReceivesRaw = Math.floor(Number(merchantReceives) * 10 ** SETTLE_TOKEN.decimals).toString();

  // x402-style response
  const res = NextResponse.json({
    error: "Payment required",
    payment: {
      chain: "base",
      chainId: SETTLE_TOKEN.chainId,
      asset: "USDC",
      assetAddress: SETTLE_TOKEN.address,
      amount: merchantReceivesRaw,
      amountUsd: merchantReceives,
      recipient: link.recipientWallet,
      description: link.description,
    },
    payUrl: `/_pay/${id}`,
    note: "Sign an EIP-3009 transferWithAuthorization USDC message and submit via /api/pay/[id] POST, or use the human pay page.",
  }, { status: 402 });

  res.headers.set("X-PAYMENT-REQUIRED", `chain=base asset=USDC amount=${merchantReceivesRaw}`);
  res.headers.set("X-PAYMENT-ADDRESS", link.recipientWallet);
  res.headers.set("X-PAYMENT-NETWORK", "base");
  return res;
}

// Optional POST handler so an AI agent can submit a tx hash and we mark it paid after confirming.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = getLink(id);
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (link.status === "paid") return NextResponse.json({ paid: true, txHash: link.paidTxHash });

  const body = await req.json().catch(() => ({}));
  const txHash = body?.txHash;
  if (!txHash) return NextResponse.json({ error: "txHash required" }, { status: 400 });

  // Verify via LI.FI status
  try {
    const status = await getStatus(txHash, "any", body?.fromChain || 8453, link.settleChainId);
    if (status?.status === "DONE") {
      markPaid(id, txHash, body?.paidBy || "agent", body?.fromToken || "USDC", body?.fromChain || 8453, body?.fromAmount || "0");
      return NextResponse.json({ paid: true, txHash });
    }
    return NextResponse.json({ paid: false, status: status?.status, substatus: status?.substatus }, { status: 202 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
