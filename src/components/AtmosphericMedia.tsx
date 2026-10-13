import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MediaProps = { name: 'hero' | 'about' | 'sensor' | 'radar'; className?: string; paused?: boolean }
const clips = { hero: 'atmosphere', about: 'clouds', sensor: 'field', radar: 'close' }

export function AtmosphericMedia({ name, className = '', paused = false }: MediaProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const poster = `/assets/aeris/aeris-${name}-poster.webp`

  useEffect(() => {
    const target = name === 'hero' ? document.getElementById('overview') : containerRef.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, { threshold: 0.01 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [name])

  useEffect(() => {
    if (inView && !paused && !reduced) setLoaded(true)
  }, [inView, paused, reduced])

  useEffect(() => {
    const video = ref.current
    if (!video || reduced || failed) return
    const onVisibility = () => {
      if (document.hidden || !inView || paused) video.pause()
      else void video.play().catch(() => {})
    }
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      video.pause()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, failed, inView, paused, loaded])

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    <img src={poster} alt="" loading={name === 'hero' ? 'eager' : 'lazy'} decoding="async" className={`absolute inset-0 h-full w-full object-cover ${failed ? 'media-poster' : ''}`} style={{ animationPlayState: inView && !paused ? 'running' : 'paused' }} />
    {loaded && !reduced && !failed && <video ref={ref} className="absolute inset-0 h-full w-full object-cover" autoPlay={inView && !paused} loop muted playsInline poster={poster} preload="none" onError={() => setFailed(true)}>
      <source src={`/assets/aeris/aeris-${name}-${clips[name]}.mp4`} type="video/mp4" />
    </video>}
  </div>
}
