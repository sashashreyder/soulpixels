import { useMemo } from 'react'

export default function PixelSky() {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 6}px`
    }))
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white/40 hover:bg-purple-300 transition rounded shadow-md"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            cursor: 'pointer',
          }}
          onClick={() => console.log(`Pixel #${i} clicked!`)}
        />
      ))}
    </div>
  )
}

  
  
  