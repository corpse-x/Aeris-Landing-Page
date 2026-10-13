import { ChevronRight } from 'lucide-react'
import { AtmosphericMedia } from '@/components/AtmosphericMedia'
import { useReveal } from '@/hooks/useReveal'

function MapBar({ delay, onBrief }: { delay: number; onBrief: () => void }) {
  return <button onClick={onBrief} className="action reveal-item reveal-up flex w-full items-center justify-between gap-3 rounded-xl bg-card py-2 pl-4 pr-2 text-left text-[11px] leading-relaxed text-black xl:text-sm" style={{ animationDelay: `${delay}ms` }}>
    <span>From scattered readings to one living map</span>
    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-black text-white"><ChevronRight size={22} strokeWidth={1.5} /></span>
  </button>
}

export default function Products({ onBrief, paused }: { onBrief: () => void; paused: boolean }) {
  const { ref, visible } = useReveal(0.1)
  const focusSignals = () => {
    const section = document.getElementById('signals')
    section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    section?.focus({ preventScroll: true })
  }

  return <section ref={ref} id="signals" tabIndex={-1} aria-label="Signals" className={`product-screen relative z-10 mt-[3px] min-h-screen w-full bg-products p-2 sm:p-3 md:h-screen ${visible ? 'is-visible' : ''}`}>
    <div className="grid h-full grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3">
      <article aria-label="Terrain" className="reveal-item reveal-scale relative min-h-[500px] overflow-hidden rounded-2xl md:min-h-0" style={{ animationDelay: '100ms' }}>
        <img src="/assets/aeris/aeris-trace-topography.webp" alt="Monochrome topographic field with layered atmospheric contours" className="absolute inset-0 h-full w-full object-cover object-[35%_center]" loading="lazy" />
        <div className="absolute inset-0 bg-white/15" />
        <div className="relative flex h-full min-h-[500px] flex-col justify-between gap-16 p-5 sm:p-6 md:min-h-0">
          <div className="reveal-item reveal-up pt-14" style={{ animationDelay: '300ms' }}>
            <p className="font-bubbledot text-5xl text-black/80 sm:text-6xl">01</p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-black/70 sm:text-sm">A field layer for seeing the patterns that separate a passing fluctuation from a place under pressure.</p>
          </div>
          <div className="flex flex-col gap-2">
            <MapBar delay={450} onBrief={onBrief} />
            <div className="grid grid-cols-5 gap-2">
              <div className="reveal-item reveal-up col-span-3 rounded-xl bg-card p-4 [container-type:inline-size]" style={{ animationDelay: '550ms' }}>
                <p className="text-[10px] leading-relaxed text-black/70 xl:text-xs">The question is not what changed first, but what the whole field is becoming.</p>
                <h2 className="mt-3 font-bubbledot text-[clamp(1rem,24cqw,3.75rem)] text-black">Terrain</h2>
              </div>
              <p className="reveal-item reveal-up col-span-2 flex items-end justify-end pb-2 font-bubbledot text-5xl text-black sm:text-6xl md:text-[clamp(2rem,3.6vw,3.75rem)]" style={{ animationDelay: '650ms' }}>W/04</p>
            </div>
          </div>
        </div>
      </article>
      <article aria-label="Current" className="reveal-item reveal-scale relative min-h-[500px] overflow-hidden rounded-2xl bg-black md:min-h-0" style={{ animationDelay: '250ms' }}>
        <AtmosphericMedia name="sensor" paused={paused} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full min-h-[500px] flex-col justify-between gap-16 p-6 sm:p-8 md:min-h-0">
          <div className="reveal-item reveal-up pt-12 text-xs leading-relaxed text-white/70 sm:text-sm" style={{ animationDelay: '450ms' }}>
            <p>AERIS reads temperature, wind, particulate load, and ground-level context together — so teams can respond to conditions, not isolated numbers.</p>
            <p className="mt-4">Live field signals become a shared language for planners, researchers, and the people moving through a place.</p>
            <p className="mt-8 font-bubbledot text-5xl text-white sm:text-6xl">C/01</p>
          </div>
          <button onClick={focusSignals} aria-label="Explore atmospheric signals" className="action reveal-item reveal-up flex size-12 items-center justify-center rounded-xl bg-accent text-white" style={{ animationDelay: '600ms' }}><ChevronRight size={24} strokeWidth={1.5} /></button>
        </div>
      </article>
      <article aria-label="Lens" className="reveal-item reveal-scale flex min-h-[500px] flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 sm:gap-3 sm:p-3 md:min-h-0" style={{ animationDelay: '400ms' }}>
        <div className="flex flex-1 flex-col gap-2">
          <div className="reveal-item reveal-fade relative min-h-[210px] flex-1 overflow-hidden rounded-xl bg-black" style={{ animationDelay: '550ms' }}><AtmosphericMedia name="radar" paused={paused} /></div>
          <MapBar delay={650} onBrief={onBrief} />
        </div>
        <div className="reveal-item reveal-up flex flex-1 flex-col justify-end rounded-xl bg-card p-5 sm:p-6" style={{ animationDelay: '750ms' }}>
          <p className="font-bubbledot text-5xl text-black sm:text-6xl">L/01</p>
          <h2 className="mt-5 max-w-xs text-xl leading-snug tracking-tight text-black sm:text-2xl">Notice what the forecast cannot</h2>
        </div>
      </article>
    </div>
  </section>
}
