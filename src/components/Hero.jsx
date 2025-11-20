import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-emerald-200/90">Autonomous Document Intelligence Agent</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Analyze. Validate. Fill. Approve.
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto">
          FlamesAI reads any document, extracts what's needed, fixes issues, and returns a clean, acceptance‑ready result. Built for compliance, speed, and precision.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#try" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow/50 shadow-white/10 hover:shadow-white/20 transition">
            Try it now
          </a>
          <a href="#how" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold ring-1 ring-white/20 hover:bg-white/15 transition">
            See how it works
          </a>
        </div>

        <div className="mt-8 text-blue-100/70 text-sm">
          Zero fluff • Enterprise‑grade • API‑ready
        </div>
      </div>
    </section>
  )
}
