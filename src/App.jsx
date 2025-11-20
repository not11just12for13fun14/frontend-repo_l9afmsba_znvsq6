import Hero from './components/Hero'
import Features from './components/Features'
import DocDemo from './components/DocDemo'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-blue-100">
      <header className="fixed top-0 inset-x-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
            <span className="font-semibold text-white">FlamesAI</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#try" className="hover:text-white">Try it</a>
            <a href="/test" className="hover:text-white">Backend test</a>
          </nav>
        </div>
      </header>

      <main className="relative pt-20">
        <Hero />
        <Features />
        <DocDemo />
      </main>

      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-sm text-blue-200/70 flex items-center justify-between">
          <span>Enterprise-grade document intelligence</span>
          <a href="/test" className="hover:text-white">System check →</a>
        </div>
      </footer>
    </div>
  )
}

export default App
