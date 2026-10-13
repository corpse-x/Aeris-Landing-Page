import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fading, setFading] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      onComplete()
      return
    }
    let animation = 0
    let timeout = 0
    let start: number | undefined
    const blockSize = 10
    const rings = [
      Array.from({ length: 360 }, (_, index) => ({ angle: 2 * Math.PI * index / 360 + (Math.random() - .5) * .02, offset: .85 + Math.random() * .3, size: blockSize })),
      Array.from({ length: 180 }, (_, index) => ({ angle: 2 * Math.PI * index / 180 + (Math.random() - .5) * .02, offset: .92 + Math.random() * .12, size: blockSize * .8 })),
    ].flat().map(block => ({
      directionX: Math.cos(block.angle) * block.offset,
      directionY: Math.sin(block.angle) * block.offset,
      size: block.size,
    }))
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      context.globalCompositeOperation = 'source-over'
      context.fillStyle = '#000'
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
    const finish = () => {
      setFading(true)
      timeout = window.setTimeout(onComplete, reduced ? 200 : 400)
    }
    resize()
    window.addEventListener('resize', resize)
    if (reduced) animation = requestAnimationFrame(finish)
    else {
      const frame = (timestamp: number) => {
        start ??= timestamp
        const progress = Math.min((timestamp - start) / 1800, 1)
        const radius = Math.hypot(canvas.width, canvas.height) / 2 * (1 - (1 - progress) ** 3)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.globalCompositeOperation = 'source-over'
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.globalCompositeOperation = 'destination-out'
        context.beginPath()
        context.arc(centerX, centerY, Math.max(0, radius - blockSize * 2), 0, Math.PI * 2)
        context.fill()
        context.beginPath()
        for (const block of rings) {
          const positionX = centerX + block.directionX * radius
          const positionY = centerY + block.directionY * radius
          context.rect(positionX - block.size / 2, positionY - block.size / 2, block.size, block.size)
        }
        context.fill()
        if (progress < 1) animation = requestAnimationFrame(frame)
        else finish()
      }
      animation = requestAnimationFrame(frame)
    }
    return () => {
      cancelAnimationFrame(animation)
      clearTimeout(timeout)
      window.removeEventListener('resize', resize)
    }
  }, [onComplete, reduced])

  return <div aria-hidden="true" className={`splash-overlay fixed inset-0 z-[9999] transition-opacity duration-[400ms] ${fading ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
    <canvas ref={canvasRef} className="block h-full w-full" />
  </div>
}
