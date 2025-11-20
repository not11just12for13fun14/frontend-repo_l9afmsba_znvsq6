import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, KeyRound, Sparkles, ShieldCheck, Bot, User } from 'lucide-react'

const lsKey = 'FLAMES_API_KEY'

export default function ChatAutopilot() {
  const [apiKey, setApiKey] = useState('')
  const [draftKey, setDraftKey] = useState('')
  const [messages, setMessages] = useState([
    { id: 'sys-1', role: 'assistant', content: "I'm your FlamesAI autopilot. Paste a document or start with 'analyze:' followed by the text, and I'll validate, fill and summarize it." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem(lsKey)
    if (stored) {
      setApiKey(stored)
      setDraftKey(stored)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const saveKey = () => {
    localStorage.setItem(lsKey, draftKey.trim())
    setApiKey(draftKey.trim())
  }

  const clearKey = () => {
    localStorage.removeItem(lsKey)
    setApiKey('')
    setDraftKey('')
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMsg = { id: `u-${Date.now()}`, role: 'user', content: input.trim() }
    setMessages((m) => [...m, newMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${backend}/agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
        },
        body: JSON.stringify({ messages: [...messages, newMsg].map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages((m) => [
        ...m,
        { id: `e-${Date.now()}`, role: 'assistant', content: `⚠️ ${e.message}. If API keys are enabled on the server, add your key via the Key button.` },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section className="relative py-20" id="autopilot">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 h-[40rem] w-[40rem] bg-fuchsia-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-semibold">Autopilot Chat</h2>
              <p className="text-blue-100/70 text-sm">Paste a document or type analyze: followed by content</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-blue-100/70 text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>API key {apiKey ? 'set' : 'optional'}</span>
            </div>
            <button onClick={() => document.getElementById('apiKeyModal').showModal()} className="px-3 py-2 rounded-lg bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Key
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <motion.div className="rounded-2xl bg-slate-900/40 ring-1 ring-white/10 overflow-hidden flex flex-col min-h-[28rem]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex-1 p-4 sm:p-6 space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div key={m.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 backdrop-blur ring-1 ${
                      m.role === 'assistant' ? 'bg-white/5 ring-white/10' : 'bg-indigo-500/20 ring-indigo-400/30 ml-auto'
                    }`}>
                      <div className="flex items-center gap-2 mb-1 opacity-80 text-xs">
                        {m.role === 'assistant' ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                        <span>{m.role === 'assistant' ? 'FlamesAI' : 'You'}</span>
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed text-blue-100">{m.content}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/30">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type here… Use analyze: followed by your document to auto-validate"
                  className="flex-1 min-h-[3rem] max-h-40 p-3 rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-blue-100 placeholder:text-blue-200/40 focus:outline-none focus:ring-indigo-400/40"
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()} className="shrink-0 h-11 px-4 rounded-xl bg-indigo-500 text-white font-semibold disabled:opacity-50 flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending…' : 'Send'}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.aside className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <h3 className="text-white font-semibold mb-3">Pro tips</h3>
            <ul className="text-sm text-blue-100/80 space-y-2 list-disc pl-5">
              <li>Paste forms with key:value lines for best results.</li>
              <li>Use analyze: and then your document block.</li>
              <li>We auto-detect emails, phones, and dates and normalize formats.</li>
              <li>Add an API key if your server enforces one.</li>
            </ul>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10 p-4">
              <div className="text-xs uppercase tracking-wider text-blue-100/60 mb-2">Compliance-first</div>
              <p className="text-blue-100/90 text-sm">
                Outputs include cleaned text, field corrections, missing items, and a structured JSON you can plug into workflows.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>

      <dialog id="apiKeyModal" className="backdrop:bg-black/50 rounded-2xl">
        <form method="dialog" className="m-0">
          <div className="w-[92vw] max-w-md p-6 bg-slate-900 text-blue-100 rounded-2xl ring-1 ring-white/10">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="h-5 w-5" />
              <h4 className="text-white font-semibold">API Key</h4>
            </div>
            <p className="text-sm text-blue-200/70 mb-4">
              Add your key to call secured endpoints. Header used: x-api-key
            </p>
            <input
              value={draftKey}
              onChange={(e) => setDraftKey(e.target.value)}
              placeholder="paste key…"
              className="w-full rounded-lg bg-slate-950/50 ring-1 ring-white/10 p-3 text-blue-100 placeholder:text-blue-200/40"
            />
            <div className="flex items-center justify-end gap-2 mt-4">
              <button type="button" onClick={clearKey} className="px-3 py-2 rounded-lg bg-white/10 ring-1 ring-white/20 text-white">Clear</button>
              <button type="submit" onClick={saveKey} className="px-3 py-2 rounded-lg bg-indigo-500 text-white font-semibold">Save</button>
            </div>
          </div>
        </form>
      </dialog>
    </section>
  )
}
