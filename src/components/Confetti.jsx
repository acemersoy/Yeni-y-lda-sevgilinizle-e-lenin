import { useEffect, useState } from 'react'

const Confetti = ({ active, onComplete }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const colors = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#ec4899']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 8,
    }))

    setParticles(newParticles)

    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 4000)

    return () => clearTimeout(timer)
  }, [active, onComplete])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animation: `confetti-fall ${particle.duration}s linear ${particle.delay}s`,
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

