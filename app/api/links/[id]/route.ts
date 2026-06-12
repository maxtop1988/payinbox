// GET /api/links/[id] — public, returns link details (no secret needed for pay page).

import { NextRequest, NextResponse } from "next/server";
import { getLink } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = getLink(id);
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    id: link.id,
    amount: link.amount,
    description: link.description,
    status: link.status,
    settleChainId: link.settleChainId,
    settleTokenAddress: link.settleTokenAddress,
    recipientWallet: link.recipientWallet,
    paidAt: link.paidAt,
    paidTxHash: link.paidTxHash,
  });
}
