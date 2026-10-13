import { ChevronRight } from 'lucide-react'
import { AtmosphericMedia } from '@/components/AtmosphericMedia'
import { useReveal } from '@/hooks/useReveal'

export default function About({ onBrief, paused }: { onBrief: () => void; paused: boolean }) {
  const { ref, visible } = useReveal(0.1)
  return <section ref={ref} id="field-notes" tabIndex={-1} aria-labelledby="about-title" className={`relative z-10 mt-[3px] min-h-screen w-full overflow-hidden bg-story ${visible ? 'is-visible' : ''}`}>
    <AtmosphericMedia name="about" paused={paused} />
    <div className="absolute inset-0 bg-story/35" />
    <div className="full-screen relative flex min-h-screen flex-col justify-between gap-24 px-4 pb-10 pt-28 sm:px-6 sm:pb-16 lg:px-10">
      <div className="max-w-xs sm:max-w-sm">
        <p className="reveal-item reveal-up text-xs leading-relaxed text-black/80 sm:text-sm" style={{ animationDelay: '100ms' }}>AERIS translates living atmosphere into a shared picture of what is changing, where, and why it matters.</p>
        <button onClick={onBrief} className="action reveal-item reveal-up mt-7 flex items-center gap-4 rounded-xl bg-white py-2 pl-2 pr-5 text-xs text-black shadow-sm sm:text-sm" style={{ animationDelay: '250ms' }}>
          <span className="flex size-11 items-center justify-center rounded-lg bg-black text-white"><ChevronRight size={22} strokeWidth={1.5} /></span>Request a Field Brief
        </button>
      </div>
      <div className="flex flex-col items-end justify-between gap-12 md:flex-row md:gap-16">
        <h2 id="about-title" className="reveal-item reveal-up w-full max-w-md text-2xl font-medium leading-snug text-black sm:text-3xl lg:text-4xl" style={{ animationDelay: '400ms' }}>
          Meet AERIS. Built to <span className="text-black/40">read the atmosphere</span> and make change legible
        </h2>
        <p className="reveal-item reveal-up max-w-lg text-right text-xl font-medium leading-snug text-black sm:text-2xl lg:text-3xl" style={{ animationDelay: '550ms' }}>
          Follow a pressure line and understand how <span className="text-black/40">small shifts</span> become <strong className="font-bold">shared conditions</strong>
        </p>
      </div>
    </div>
  </section>
}
