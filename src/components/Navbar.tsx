import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import { Mark } from '@/components/Mark'

const links = [
  { label: 'Overview', target: 'overview' },
  { label: 'Field Notes', target: 'field-notes' },
  { label: 'Signals', target: 'signals' },
  { label: 'FAQ', target: 'brief' },
  { label: 'Contact', target: 'brief' },
]

export default function Navbar({ onBrief, onMenuChange }: { onBrief: () => void; onMenuChange: (open: boolean) => void }) {
  const [isDark, setIsDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Overview')
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0
    let sections: { label: string; top: number }[] = []
    const update = () => {
      frame = 0
      const scrollPosition = window.scrollY
      setIsDark(scrollPosition > window.innerHeight * .7)
      const section = sections.find(section => section.top <= scrollPosition + window.innerHeight * .45)
      if (section) setActive(section.label)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const measure = () => {
      sections = links.slice(0, 3).reverse().map(link => ({
        label: link.label,
        top: (document.getElementById(link.target)?.getBoundingClientRect().top ?? 0) + window.scrollY,
      }))
      onScroll()
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
      measure()
    }
    measure()
    const observer = new ResizeObserver(measure)
    const main = document.querySelector('main')
    if (main) observer.observe(main)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    onMenuChange(open)
    const menu = menuRef.current
    if (menu) menu.inert = !open
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => menu?.querySelector<HTMLButtonElement>('button')?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const buttons = [toggleRef.current, ...Array.from(menu?.querySelectorAll<HTMLButtonElement>('button') ?? [])].filter(Boolean) as HTMLButtonElement[]
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onMenuChange])

  const navigate = (target: string, label: string) => {
    setOpen(false)
    setActive(label)
    window.setTimeout(() => {
      if (target === 'brief') {
        if (open) toggleRef.current?.focus()
        onBrief()
      }
      else {
        const section = document.getElementById(target)
        section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
        section?.focus({ preventScroll: true })
      }
    }, 0)
  }

  return <>
    <nav aria-label="Main navigation" className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <div className="relative flex items-center justify-between">
        <a href="#overview" aria-label="AERIS — Overview" tabIndex={open ? -1 : undefined} className={`flex items-center gap-2.5 transition-colors duration-300 ${isDark && !open ? 'text-black' : 'text-white'}`}>
          <Mark /><span className="text-lg font-semibold tracking-[.12em]">AERIS</span>
        </a>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-lg bg-white p-1.5 shadow-sm lg:flex">
          {links.map(link => <button key={link.label} onClick={() => navigate(link.target, link.label)} aria-current={active === link.label ? 'page' : undefined} className={`rounded-md px-4 py-2.5 text-[11px] transition-colors xl:px-5 ${active === link.label ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5 hover:text-black'}`}>{link.label}</button>)}
        </div>
        <button onClick={onBrief} className="action group hidden items-center gap-4 rounded-lg bg-black py-1.5 pl-4 pr-1.5 text-xs text-white lg:flex">
          Request a Brief<span className="flex size-9 items-center justify-center rounded-md bg-white/10"><ChevronRight size={18} /></span>
        </button>
        <button ref={toggleRef} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className={`relative size-10 rounded-lg border border-white/10 bg-white/10 backdrop-blur-md lg:hidden ${isDark && !open ? 'text-black' : 'text-white'}`}>
          <Menu size={20} className={`absolute left-[9px] top-[9px] transition-all duration-300 ${open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
          <X size={20} className={`absolute left-[9px] top-[9px] transition-all duration-300 ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
        </button>
      </div>
    </nav>
    <div ref={menuRef} id="mobile-menu" aria-hidden={!open} className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black/95 px-6 pb-8 pt-28 transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
      <div className="space-y-2">
        {links.map((link, index) => <button key={link.label} tabIndex={open ? 0 : -1} onClick={() => navigate(link.target, link.label)} style={{ transitionDelay: `${open ? 150 + index * 70 : (links.length - index) * 30}ms` }} className={`flex w-full items-center justify-between rounded-xl p-4 text-left text-2xl transition-[opacity,transform] duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${active === link.label ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>
          {link.label}{active === link.label && <ChevronRight size={22} />}
        </button>)}
      </div>
      <div className="mt-auto pt-10">
        <button tabIndex={open ? 0 : -1} onClick={() => navigate('brief', 'Contact')} className="action flex w-full items-center justify-between rounded-xl bg-white p-4 text-sm text-black">Request a Brief<ChevronRight size={20} /></button>
        <p className="mx-auto mt-5 max-w-xs text-center text-[10px] leading-relaxed text-white/30">Atmospheric intelligence for the places people live.</p>
      </div>
    </div>
  </>
}
