import { ChevronRight } from 'lucide-react'

export default function Hero({ ready }: { ready: boolean }) {
  return <section id="overview" tabIndex={-1} aria-labelledby="hero-title" className={`hero-screen relative z-10 flex h-screen w-full flex-col px-4 sm:px-6 lg:px-10 ${ready ? 'is-visible' : ''}`}>
    <div className="pt-40 text-center sm:pt-52">
      <p className="reveal-item reveal-up mb-10 text-xs uppercase tracking-[.3em] text-white/70 sm:mb-16 sm:text-sm" style={{ animationDelay: '300ms' }}>ATMOSPHERIC INTELLIGENCE</p>
      <h1 id="hero-title" className="reveal-item reveal-up font-bubbledot text-3xl font-normal leading-[.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: '500ms' }}>
        <span className="block">Read the Air.</span>{' '}<span className="mt-3 block sm:mt-4">Shape the Day.</span>
      </h1>
    </div>
    <div className="mt-auto flex flex-col items-start justify-between gap-7 pb-8 pt-12 sm:flex-row sm:items-end sm:pb-12">
      <p className="reveal-item reveal-up max-w-sm text-xs leading-relaxed text-white/60 sm:text-sm" style={{ animationDelay: '700ms' }}>See heat, wind, and particulate change as it moves — before it becomes a headline.</p>
      <a href="#field-notes" className="action reveal-item reveal-up group flex items-center gap-5 rounded-xl bg-black py-2 pl-2 pr-5 text-xs text-white sm:text-sm" style={{ animationDelay: '900ms' }}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent"><ChevronRight size={22} strokeWidth={1.5} /></span>
        Explore the Field Guide
      </a>
    </div>
  </section>
}
