"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CHAIN_NAMES, FEE_BPS } from "@/lib/chains";

// Load the LI.FI widget dynamically — it's heavy and only needed on the pay page.
// ssr:false so it doesn't try to render on the server.
const LiFiWidget = dynamic(() => import("@lifi/widget").then((m) => m.LiFiWidget), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-slate-400 text-sm">
      Loading payment widget…
    </div>
  ),
});

type Props = {
  id: string;
  description: string;
  requestedAmount: string;
  merchantReceives: string;
  merchantReceivesRaw: string;
  settleTokenAddress: string;
  settleChainId: number;
  recipientWallet: string;
  status: "active" | "paid" | "expired";
  paidTxHash?: string;
};

export function PayClient(props: Props) {
  const {
    id,
    description,
    requestedAmount,
    merchantReceives,
    merchantReceivesRaw,
    settleTokenAddress,
    settleChainId,
    recipientWallet,
    status,
    paidTxHash,
  } = props;

  if (status === "paid") {
    return <PaidScreen id={id} description={description} amount={requestedAmount} txHash={paidTxHash} />;
  }
  if (status === "expired") {
    return <ExpiredScreen id={id} description={description} amount={requestedAmount} />;
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b border-slate-800/50 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-slate-950">P</div>
            <span className="font-semibold text-lg">PayInbox</span>
          </Link>
          <a
            href={`https://basescan.org/address/${recipientWallet}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 font-mono"
          >
            {recipientWallet.slice(0, 6)}…{recipientWallet.slice(-4)} ↗
          </a>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Header card */}
        <div className="glass-strong rounded-3xl p-8 mb-6">
          <div className="text-center mb-4">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Payment request</div>
            <div className="text-6xl font-bold gradient-text mb-2">${requestedAmount}</div>
            <div className="text-slate-400 text-sm">USDC on {CHAIN_NAMES[settleChainId]}</div>
          </div>
          {description && (
            <div className="border-t border-slate-800 pt-4 mt-4 text-center">
              <p className="text-slate-300 text-sm">{description}</p>
            </div>
          )}
          <div className="border-t border-slate-800 pt-4 mt-4 text-center text-xs text-slate-500">
            Merchant receives <span className="text-emerald-400">${merchantReceives} USDC</span> ·
            PayInbox fee <span className="text-purple-400">{FEE_BPS / 100}%</span>
          </div>
        </div>

        {/* The actual widget. We lock toAddress + toToken + toChain so the customer
            can only vary the source token / chain / amount. */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 min-h-[600px]">
          <LiFiWidget
            integrator="payinbox"
            toChain={settleChainId}
            toToken={settleTokenAddress}
            toAddress={{ chainType: "EVM" as any, address: recipientWallet, name: "PayInbox merchant" }}
            toAmount={merchantReceivesRaw}
            variant="wide"
            subvariant="default"
            appearance="dark"
            feeConfig={{
              name: "PayInbox",
              fee: 0.01, // 1%
              showFeePercentage: true,
              showFeeTooltip: true,
            }}
            hiddenUI={["appearance", "language", "poweredBy"] as any}
            disabledUI={["toToken", "toAddress"] as any}
            theme={{
              container: {
                borderRadius: "24px",
                background: "transparent",
              },
              palette: {
                primary: { main: "#22d3ee" },
                secondary: { main: "#a78bfa" },
              },
            }}
          />
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Powered by <a href="https://li.quest" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">LI.FI</a> · x402 compatible
        </div>
      </div>
    </main>
  );
}

function PaidScreen({ id, description, amount, txHash }: { id: string; description: string; amount: string; txHash?: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-6">
          <span className="text-5xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment received</h1>
        <p className="text-slate-400 mb-6">${amount} USDC delivered to the merchant.</p>
        {description && <p className="text-slate-300 mb-6">{description}</p>}
        {txHash && (
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-mono"
          >
            View on BaseScan ↗
          </a>
        )}
        <div className="mt-8 text-xs text-slate-500">Payment ID: {id}</div>
      </div>
    </main>
  );
}

function ExpiredScreen({ id, description, amount }: { id: string; description: string; amount: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">⏱</div>
        <h1 className="text-2xl font-bold mb-2">This link has expired</h1>
        <p className="text-slate-400">Ask the merchant to create a new one.</p>
      </div>
    </main>
  );
}
