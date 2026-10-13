import { useEffect, useRef } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { Mark } from '@/components/Mark'

export default function BriefDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (!open) {
      if (dialog.open) dialog.close()
      return
    }
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open])

  const navigate = (target: string) => {
    onClose()
    window.setTimeout(() => {
      const section = document.getElementById(target)
      section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      section?.focus({ preventScroll: true })
    }, 0)
  }

  return <dialog ref={ref} aria-labelledby="brief-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} className="fixed w-[calc(100%-32px)] max-w-xl overflow-visible rounded-2xl bg-story p-0 text-black shadow-2xl">
    <div className="relative p-6 sm:p-10">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-widest"><Mark />AERIS</div>
      <button autoFocus onClick={onClose} aria-label="Close field brief" className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-lg bg-black/5 transition hover:bg-black/10"><X size={20} /></button>
      <h2 id="brief-title" className="mt-10 text-2xl font-medium">Request a Brief</h2>
      <p className="mt-5 text-sm leading-relaxed text-black/70">AERIS translates living atmosphere into a shared picture of what is changing, where, and why it matters.</p>
      <p className="mt-4 text-xs leading-relaxed text-black/60">Atmospheric intelligence for the places people live.</p>
      <div className="mt-9 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => navigate('field-notes')} className="action flex flex-1 items-center justify-between gap-4 rounded-xl bg-black p-4 text-xs text-white">Explore the Field Guide<ChevronRight size={18} /></button>
        <button onClick={() => navigate('signals')} className="action flex items-center justify-between gap-6 rounded-xl bg-white p-4 text-xs">Signals<ChevronRight size={18} /></button>
      </div>
    </div>
  </dialog>
}
