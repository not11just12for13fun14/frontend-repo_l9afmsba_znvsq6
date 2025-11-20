export default function Features() {
  const items = [
    {
      title: 'Autonomous completion',
      desc: 'Understands structure, fills missing data, validates rules, and optimizes for acceptance.',
    },
    {
      title: 'Error detection',
      desc: 'Catches inconsistencies, compliance risks, and formatting issues. Auto-corrects with reasoning.',
    },
    {
      title: 'Universal input',
      desc: 'Forms, PDFs, scans, contracts, visas, HR docs, enterprise workflows — all supported.',
    },
    {
      title: 'Structured outputs',
      desc: 'Delivers JSON, polished text, summaries, and file-ready documents you can download.',
    },
  ]

  return (
    <section id="how" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((f, i) => (
          <div key={i} className="rounded-2xl bg-slate-900/40 ring-1 ring-white/10 p-6 hover:bg-slate-900/55 transition">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 ring-1 ring-indigo-400/30 flex items-center justify-center mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">{f.title}</h3>
            <p className="text-blue-100/80 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
