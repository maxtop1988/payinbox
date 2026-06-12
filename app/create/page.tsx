"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePage() {
  const router = useRouter();
  const [amount, setAmount] = useState("10.00");
  const [description, setDescription] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Basic validation
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Enter a positive amount");
      }
      if (!wallet || !wallet.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw new Error("Enter a valid EVM wallet address (0x...) — Base USDC settlement");
      }
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description, recipientWallet: wallet }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      router.push(`/created?id=${data.id}&secret=${data.secret}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b border-slate-800/50 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-slate-950">P</div>
            <span className="font-semibold text-lg">PayInbox</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create a payment link</h1>
        <p className="text-slate-400 mb-8">No signup. Get a shareable link in 10 seconds. Customer pays you in USDC on Base.</p>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10.00"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-lg font-medium focus:outline-none focus:border-cyan-500"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">Customer pays equivalent in their token. You receive this amount in USDC (minus 1% fee).</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description <span className="text-slate-500">(optional)</span></label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Invoice #42, or 'Coffee for the team'"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
              maxLength={140}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Your wallet <span className="text-slate-500">(receives USDC on Base)</span></label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
            />
            <p className="text-xs text-slate-500 mt-1.5">Any EVM address. Base mainnet USDC. Save this URL to manage later.</p>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating…" : "Create payment link →"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Or{" "}
          <Link href="/pay/demo" className="text-cyan-400 hover:text-cyan-300">
            try the demo link
          </Link>
        </div>
      </div>
    </main>
  );
}
