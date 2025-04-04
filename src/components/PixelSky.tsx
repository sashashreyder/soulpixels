export default function PixelSky() {
    const stars = Array.from({ length: 100 })
  
    return (
      <div className="absolute inset-0 z-0">
        {stars.map((_, i) => {
          const size = Math.random() * 6 + 4
          return (
            <div
              key={i}
              className="absolute bg-white/70 rounded-sm transition-transform duration-300 hover:scale-150 hover:bg-purple-400 shadow-md"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                zIndex: 1,
                cursor: 'pointer',
              }}
            />
          )
        })}
      </div>
    )
  }
  
  
  
  