import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-slate-950">P</div>
            <span className="font-semibold text-lg">PayInbox</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/pay/demo" className="text-slate-400 hover:text-slate-100 transition">Try the demo</Link>
            <Link href="/create" className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition">Create a link</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Built on the x402 agent economy · 75M+ payments
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            One payment link.<br />
            <span className="gradient-text">Any token, any chain.</span><br />
            Settles in USDC.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            The Zernio of crypto payments. Create a link in 10 seconds. Your customer pays in whatever they have — USDC on Base, ETH, SOL, or 7 more rails. You receive clean USDC. 1% fee. No bridging headaches.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/create" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-lg hover:scale-105 transition glow">
              Create your first link →
            </Link>
            <Link href="/pay/demo" className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 font-medium transition">
              See it live
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-500">No signup. No KYC. Free to try. Just paste your wallet.</p>
        </div>
      </section>

      {/* Pain / status quo */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Crypto payments are a <span className="text-red-400">fragmented mess</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                USDC lives on <span className="text-slate-200">30+ chains</span>. Your customer has ETH on Base. Or USDC on Polygon. Or SOL. Or whatever. Bridging is a 12-step nightmare. Most customers just… don't pay.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 space-y-2 font-mono text-sm">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-3">Before PayInbox</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-red-400">✗</span> Customer opens MetaMask, sees USDC on Polygon</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-red-400">✗</span> You need them to bridge to Base</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-red-400">✗</span> They have to swap, approve, sign 4 times</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-red-400">✗</span> Half give up. You lose the sale.</div>
              <div className="border-t border-slate-800 my-3" />
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-3">With PayInbox</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-cyan-400">✓</span> Customer clicks your link</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-cyan-400">✓</span> Picks "Pay with USDC on Polygon"</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-cyan-400">✓</span> One signature. We bridge to your USDC on Base.</div>
              <div className="flex items-center gap-2 text-slate-300"><span className="text-cyan-400">✓</span> You get paid. Customer paid in their token.</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Create a link", body: "Set amount + your USDC wallet. Optional description. Get a shareable link in 10 seconds." },
              { step: "2", title: "Share it", body: "Send the link, drop a QR code, embed it. Works in any chat, email, tweet, or invoice." },
              { step: "3", title: "Get paid in USDC", body: "Customer pays in whatever they have. We bridge to USDC on Base. 1% fee, deducted invisibly." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-slate-950 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For AI agents (x402 angle) */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-4">
                  For AI agents · x402 compatible
                </div>
                <h2 className="text-3xl font-bold mb-4">Agents can pay, too.</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-4">
                  Every PayInbox link is also an <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">x402</code> endpoint. AI agents pay your invoice programmatically — no human, no signup, no API key. Just an HTTP request, an EIP-3009 signature, and USDC settles to your wallet.
                </p>
                <p className="text-slate-500 text-sm">Backed by Coinbase, Cloudflare, AWS, Stripe. The agent economy is moving $24M/month. Tap in.</p>
              </div>
              <div className="bg-slate-950/80 rounded-xl p-5 font-mono text-xs overflow-x-auto">
                <div className="text-slate-500"># Agent pays a PayInbox link</div>
                <div className="mt-2"><span className="text-purple-400">$</span> curl -i https://payinbox.app/p/demo</div>
                <div className="text-slate-400 mt-1">HTTP/1.1 402 Payment Required</div>
                <div className="text-cyan-300">X-PAYMENT-REQUIRED: chain=base asset=USDC amount=10000000</div>
                <div className="text-slate-400">X-PAYMENT-ADDRESS: 0x...</div>
                <div className="text-slate-500 mt-3"># Sign with EIP-3009, retry</div>
                <div className="mt-2"><span className="text-purple-400">$</span> curl -i -H <span className="text-amber-300">"X-PAYMENT: &lt;sig&gt;"</span> https://payinbox.app/p/demo</div>
                <div className="text-cyan-300">HTTP/1.1 200 OK</div>
                <div className="text-slate-500 mt-2"># 10 USDC delivered to merchant wallet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One simple fee.</h2>
          <p className="text-slate-400 text-lg mb-12">No subscriptions. No tiers. No surprises.</p>

          <div className="glass-strong rounded-3xl p-10">
            <div className="text-7xl font-bold gradient-text mb-2">1%</div>
            <p className="text-slate-300 text-lg mb-6">per successful payment, deducted from the merchant's received amount.</p>
            <div className="grid sm:grid-cols-2 gap-4 text-left text-sm">
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> Unlimited links</div>
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> Unlimited volume</div>
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> x402 + LI.FI bridge</div>
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> 10+ payment rails</div>
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> USDC settlement on Base</div>
              <div className="flex items-start gap-2 text-slate-400"><span className="text-cyan-400">✓</span> No signup, no KYC</div>
            </div>
          </div>

          <div className="mt-8 text-slate-500 text-sm">
            Example: Customer pays $100. Merchant receives $99 USDC. PayInbox takes $1.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ship your next invoice in 30 seconds.</h2>
          <p className="text-slate-400 text-lg mb-8">No signup. Free to try. Just paste your wallet.</p>
          <Link href="/create" className="inline-block px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xl hover:scale-105 transition glow">
            Create a link →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} PayInbox. The Zernio of crypto payments.</div>
          <div className="flex gap-6">
            <Link href="/pay/demo" className="hover:text-slate-300">Demo</Link>
            <Link href="/create" className="hover:text-slate-300">Create</Link>
            <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">x402</a>
            <a href="https://li.quest" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">LI.FI</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
