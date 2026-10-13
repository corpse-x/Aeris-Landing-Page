import { useCallback, useEffect, useRef, useState } from 'react'
import SplashScreen from '@/components/SplashScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import BriefDialog from '@/components/BriefDialog'
import { AtmosphericMedia } from '@/components/AtmosphericMedia'

export default function App() {
  const [splash, setSplash] = useState(true)
  const [briefOpen, setBriefOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const finishSplash = useCallback(() => setSplash(false), [])
  const openBrief = useCallback(() => setBriefOpen(true), [])
  const closeBrief = useCallback(() => setBriefOpen(false), [])
  const pauseMedia = splash || briefOpen || menuOpen

  useEffect(() => {
    if (mainRef.current) mainRef.current.inert = menuOpen
  }, [menuOpen])

  return <div className="relative">
    <div className="pointer-events-none fixed inset-0 z-0">
      <AtmosphericMedia name="hero" paused={pauseMedia} />
      <div className="absolute inset-0 bg-black/30" />
    </div>
    {splash && <SplashScreen onComplete={finishSplash} />}
    <Navbar onBrief={openBrief} onMenuChange={setMenuOpen} />
    <main ref={mainRef}>
      <Hero ready={!splash} />
      <About onBrief={openBrief} paused={pauseMedia} />
      <Products onBrief={openBrief} paused={pauseMedia} />
    </main>
    <BriefDialog open={briefOpen} onClose={closeBrief} />
  </div>
}
