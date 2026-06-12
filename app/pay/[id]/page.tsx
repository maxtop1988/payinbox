// Public pay page — uses the LI.FI Widget to handle the actual cross-chain payment.
// Merchant wants $X in USDC on Base. Customer picks whatever token they have, widget
// bridges it. We take 1% by reducing the merchant's received amount to 99% of requested.

import { notFound } from "next/navigation";
import { getLink } from "@/lib/db";
import { SETTLE_TOKEN } from "@/lib/chains";
import { PayClient } from "./pay-client";

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = getLink(id);
  if (!link) notFound();

  // Apply our 1% fee: merchant's received amount = requested * 0.99.
  // LI.FI's toAmount is in raw toToken decimals.
  const requestedUsd = Number(link.amount);
  const merchantReceivesUsd = (requestedUsd * 0.99).toFixed(2);
  const merchantReceivesRaw = Math.floor(Number(merchantReceivesUsd) * 10 ** SETTLE_TOKEN.decimals).toString();

  return (
    <PayClient
      id={link.id}
      description={link.description}
      requestedAmount={link.amount}
      merchantReceives={merchantReceivesUsd}
      merchantReceivesRaw={merchantReceivesRaw}
      settleTokenAddress={link.settleTokenAddress}
      settleChainId={link.settleChainId}
      recipientWallet={link.recipientWallet}
      status={link.status}
      paidTxHash={link.paidTxHash}
    />
  );
}
