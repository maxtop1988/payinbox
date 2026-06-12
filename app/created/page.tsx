"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Suspense } from "react";

function CreatedInner() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";
  const secret = sp.get("secret") || "";
  const payUrl = typeof window !== "undefined" ? `${window.location.origin}/pay/${id}` : `/pay/${id}`;
  const manageUrl = typeof window !== "undefined" ? `${window.location.origin}/dashboard?secret=${secret}` : `/dashboard?secret=${secret}`;

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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Link created</h1>
          <p className="text-slate-400">Share this with your customer. You'll be paid in USDC on Base when they pay.</p>
        </div>

        <div className="glass-strong rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-xl">
              <QRCodeSVG value={payUrl} size={180} />
            </div>
          </div>
          <div className="text-xs text-slate-500 mb-1">Pay link</div>
          <code className="block px-3 py-2 bg-slate-900 rounded-lg text-cyan-300 text-sm break-all mb-4">{payUrl}</code>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(payUrl)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
            >
              Copy link
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Pay me with any crypto: ${payUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
            >
              Share on X
            </a>
          </div>
        </div>

        <div className="mt-6 glass rounded-2xl p-5">
          <div className="text-xs text-slate-500 mb-1">Manage URL (save this!)</div>
          <code className="block px-3 py-2 bg-slate-900 rounded-lg text-slate-300 text-xs break-all">{manageUrl}</code>
          <p className="text-xs text-slate-500 mt-2">Bookmark this to see your payments and create more links. We don't have accounts — this URL is your login.</p>
        </div>
      </div>
    </main>
  );
}

export default function CreatedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>}>
      <CreatedInner />
    </Suspense>
  );
}
