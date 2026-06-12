// POST /api/links  — create a payment link
// GET  /api/links?secret=xxx — list links for a manage secret

import { NextRequest, NextResponse } from "next/server";
import { createLink, listLinksBySecret } from "@/lib/db";
import { SETTLE_TOKEN } from "@/lib/chains";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, description, recipientWallet } = body || {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!recipientWallet || !/^0x[a-fA-F0-9]{40}$/.test(recipientWallet)) {
      return NextResponse.json({ error: "Invalid EVM wallet address" }, { status: 400 });
    }
    if (Number(amount) > 1_000_000) {
      return NextResponse.json({ error: "Amount too large" }, { status: 400 });
    }

    const link = createLink({
      amount: Number(amount).toFixed(2),
      currency: "USDC",
      settleChainId: SETTLE_TOKEN.chainId,
      settleTokenAddress: SETTLE_TOKEN.address,
      recipientWallet,
      description: (description || "").slice(0, 280),
    });

    return NextResponse.json({
      id: link.id,
      secret: link.secret,
      payUrl: `/pay/${link.id}`,
      manageUrl: `/dashboard?secret=${link.secret}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret) return NextResponse.json({ error: "secret required" }, { status: 400 });
  const links = listLinksBySecret(secret).map((l) => ({
    id: l.id,
    amount: l.amount,
    description: l.description,
    status: l.status,
    createdAt: l.createdAt,
    paidAt: l.paidAt,
    paidTxHash: l.paidTxHash,
    paidFromToken: l.paidFromToken,
    paidFromChain: l.paidFromChain,
    paidFromAmount: l.paidFromAmount,
    recipientWallet: l.recipientWallet,
  }));
  return NextResponse.json({ links });
}
