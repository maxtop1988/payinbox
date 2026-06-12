"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CHAIN_NAMES } from "@/lib/chains";

type LinkRow = {
  id: string;
  amount: string;
  description: string;
  status: "active" | "paid" | "expired";
  createdAt: number;
  paidAt?: number;
  paidTxHash?: string;
  paidFromToken?: string;
  paidFromChain?: number;
  paidFromAmount?: string;
  recipientWallet: string;
};

function DashboardInner() {
  const sp = useSearchParams();
  const secret = sp.get("secret") || "";
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!secret) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/links?secret=${secret}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLinks(data.links || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [secret]);

  const paidLinks = links.filter((l) => l.status === "paid");
  const totalReceived = paidLinks.reduce((s, l) => s + Number(l.amount) * 0.99, 0);
  const feesCollected = paidLinks.reduce((s, l) => s + Number(l.amount) * 0.01, 0);

  if (!secret) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">No manage token</h1>
          <p className="text-slate-400">Open this dashboard from a "Manage URL" — it's the URL you saved when you created a link.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b border-slate-800/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-slate-950">P</div>
            <span className="font-semibold text-lg">PayInbox</span>
          </Link>
          <Link href="/create" className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition">+ New link</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-8">All your payment links. One secret URL = your account.</p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Stat label="Total links" value={links.length.toString()} />
          <Stat label="Total received" value={`$${totalReceived.toFixed(2)} USDC`} accent="emerald" />
          <Stat label="Fees collected" value={`$${feesCollected.toFixed(2)}`} accent="purple" />
        </div>

        {error && <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm mb-6">{error}</div>}

        {loading && links.length === 0 ? (
          <div className="text-slate-400">Loading…</div>
        ) : links.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-slate-400 mb-4">No links yet.</p>
            <Link href="/create" className="text-cyan-400 hover:text-cyan-300">Create your first link →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((l) => (
              <LinkRow key={l.id} l={l} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "emerald" | "purple" }) {
  const color = accent === "emerald" ? "text-emerald-400" : accent === "purple" ? "text-purple-400" : "text-slate-100";
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function LinkRow({ l }: { l: LinkRow }) {
  const payUrl = typeof window !== "undefined" ? `${window.location.origin}/pay/${l.id}` : `/pay/${l.id}`;
  return (
    <div className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold">${l.amount}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${l.status === "paid" ? "bg-emerald-500/20 text-emerald-300" : l.status === "expired" ? "bg-slate-700 text-slate-400" : "bg-cyan-500/20 text-cyan-300"}`}>
            {l.status}
          </span>
        </div>
        {l.description && <p className="text-slate-300 text-sm truncate">{l.description}</p>}
        <div className="text-xs text-slate-500 mt-1 font-mono">
          {l.paidAt
            ? `Paid ${new Date(l.paidAt).toLocaleString()} · from ${l.paidFromToken} on ${l.paidFromChain ? CHAIN_NAMES[l.paidFromChain] : "?"}`
            : `Created ${new Date(l.createdAt).toLocaleString()}`}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(payUrl)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm"
        >
          Copy
        </button>
        <Link href={`/pay/${l.id}`} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm">
          Open
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>}>
      <DashboardInner />
    </Suspense>
  );
}
