import { useState } from 'react'

export default function DocDemo() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`${backend}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="try" className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl bg-slate-900/50 ring-1 ring-white/10 p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-white text-2xl font-semibold">Quick document check</h2>
            <span className="text-blue-100/70 text-sm">Paste any form or text snippet</span>
          </div>

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <textarea
              className="w-full h-40 rounded-xl bg-slate-900/60 ring-1 ring-white/10 p-4 text-blue-100 placeholder:text-blue-200/40 focus:outline-none focus:ring-indigo-400/40"
              placeholder="Paste a form or contract text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <button disabled={loading || !input.trim()} className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-semibold disabled:opacity-50">
                {loading ? 'Analyzing…' : 'Analyze'}
              </button>
              {error && <span className="text-red-300 text-sm">{error}</span>}
            </div>
          </form>

          {result && (
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/40 ring-1 ring-white/10 p-4">
                <h3 className="text-white font-semibold mb-2">Filled Fields</h3>
                <pre className="text-xs text-blue-100 whitespace-pre-wrap">{JSON.stringify(result.filled_fields, null, 2)}</pre>
              </div>
              <div className="rounded-xl bg-slate-950/40 ring-1 ring-white/10 p-4">
                <h3 className="text-white font-semibold mb-2">Missing Fields</h3>
                <pre className="text-xs text-blue-100 whitespace-pre-wrap">{JSON.stringify(result.missing_fields, null, 2)}</pre>
              </div>
              <div className="rounded-xl bg-slate-950/40 ring-1 ring-white/10 p-4 md:col-span-2">
                <h3 className="text-white font-semibold mb-2">Final Clean Version</h3>
                <pre className="text-xs text-blue-100 whitespace-pre-wrap">{result.final_clean_version}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
