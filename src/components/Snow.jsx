import { useEffect, useState } from 'react'

const Snow = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10, // 5-15 saniye (daha hızlı)
      animationDelay: Math.random() * 2,
      size: 4 + Math.random() * 6, // 4-10px (daha büyük)
      opacity: 0.6 + Math.random() * 0.4, // 0.6-1.0 (daha görünür)
      drift: (Math.random() - 0.5) * 150, // -75 ile 75 piksel arası yatay kayma
    })

    const initialSnowflakes = Array.from({ length: 80 }, createSnowflake)
    setSnowflakes(initialSnowflakes)

    // Her 1.5 saniyede bir yeni kar tanesi ekle
    const interval = setInterval(() => {
      setSnowflakes((prev) => {
        const newFlakes = [...prev, createSnowflake()]
        // Maksimum 150 kar tanesi olsun
        return newFlakes.slice(-150)
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => {
        return (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `calc(${flake.left}% + ${flake.drift}px)`,
              top: '-10px',
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
              boxShadow: `0 0 ${flake.size * 2}px rgba(255, 255, 255, ${flake.opacity})`,
              filter: 'blur(0.3px)',
            }}
          />
        )
      })}
    </div>
  )
}

export default Snow

