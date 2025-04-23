import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Default thoughts shown on some stars
const defaultThoughts = {
  0: 'Stars are just thoughts waiting to be caught.',
  1: 'Not all those who wander are lost.',
  2: 'A pixel of peace in a noisy world.',
}

export default function PixelSky() {
  // Generate 100 stars with random positions and sizes
  // Some stars have default thoughts
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, index) => {
      const isDefault = index in defaultThoughts
      return {
        id: index,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 6 + 5}px`,
        thought: isDefault ? defaultThoughts[index as keyof typeof defaultThoughts] : '',
      }
    })
  }, [])

  // State for the currently selected star (for modal)
  const [selectedStar, setSelectedStar] = useState<number | null>(null)

  // Text entered by the user
  const [inputValue, setInputValue] = useState('')

  // Saved thoughts, linked to star IDs
  const [submittedThoughts, setSubmittedThoughts] = useState<{ [key: number]: string }>({})

  return (
    <div className="absolute inset-0 z-0">
      {/* Render all stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute group"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
        >
          {/* Star itself — clickable */}
          <div
            className="w-full h-full bg-white/40 hover:bg-purple-400 transition rounded shadow-md cursor-pointer"
            onClick={() => setSelectedStar(star.id)}
          />
          
          {/* Tooltip on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition text-xs text-white mt-1 absolute left-1/2 transform -translate-x-1/2 translate-y-1 whitespace-nowrap">
            {submittedThoughts[star.id] || star.thought
              ? '⭐ Thought added!'
              : "This star is still free. Want to add a thought?"}
          </div>
        </div>
      ))}

      {/* Modal that appears when a star is clicked */}
      <AnimatePresence>
        {selectedStar !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedStar(null)}
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>

              {/* Input form */}
              <h2 className="text-lg font-bold mb-2">Add your thought to the sky 🌌</h2>
              <textarea
                rows={4}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Your thought..."
              />

              {/* Submit button */}
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    setSubmittedThoughts(prev => ({
                      ...prev,
                      [selectedStar]: inputValue.trim(),
                    }))
                    setInputValue('')
                    setSelectedStar(null)
                  }
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}




  
  
  