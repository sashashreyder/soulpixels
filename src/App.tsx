import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Header from './components/Header'
import Footer from './components/Footer'
import PixelSky from './components/PixelSky'
import FloatingCloud from './components/FloatingCloud'

type Thought = {
  text: string
  mood?: string
  comments?: string[]
  top: string
  left: string
}

type RawThought = string | Omit<Thought, 'top' | 'left'>

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>(() => {
    const stored = localStorage.getItem('soul-pixel-thoughts')
    const loadedThoughts = stored ? JSON.parse(stored) : []

    return loadedThoughts.map((item: RawThought) => {
      if (typeof item === 'string') {
        return {
          text: item,
          mood: undefined,
          comments: [],
          top: `${10 + Math.random() * 70}%`,
          left: `${5 + Math.random() * 80}%`,
        }
      }
      return {
        ...item,
        top: 'top' in item ? item.top : `${10 + Math.random() * 70}%`,
        left: 'left' in item ? item.left : `${5 + Math.random() * 80}%`,
      }
    })
  })

  useEffect(() => {
    localStorage.setItem('soul-pixel-thoughts', JSON.stringify(thoughts))
  }, [thoughts])

  const [newThought, setNewThought] = useState('')
  const [selectedMood, setSelectedMood] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newThought.trim()) {
      const randomTop = `${10 + Math.random() * 70}%`
      const randomLeft = `${5 + Math.random() * 80}%`

      setThoughts(prev => [
        ...prev,
        {
          text: newThought.trim(),
          mood: selectedMood || undefined,
          comments: [],
          top: randomTop,
          left: randomLeft
        }
      ])
      setNewThought('')
      setSelectedMood('')
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
        <div className="z-10 relative flex flex-col items-center pt-6 px-4">
          <form
            onSubmit={handleSubmit}
            className="mb-6 w-full max-w-xl flex gap-2"
          >
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="appearance-none p-2 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="">Choose mood ↓</option>
              <option value="😊">😊 Happy</option>
              <option value="😔">😔 Sad</option>
              <option value="😡">😡 Angry</option>
              <option value="🧘">🧘 Calm</option>
              <option value="🤯">🤯 Overwhelmed</option>
            </select>
            <input
              type="text"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Type your thought..."
              className="text-white flex-1 p-2 rounded border border-gray-300 shadow-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Add
            </button>
          </form>

          <div className="relative w-full h-[500px] max-w-5xl">
            <AnimatePresence>
              {thoughts.map((thought, index) => (
                <motion.div
                  key={thought.text + index}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute"
                  style={{
                    top: thought.top,
                    left: thought.left,
                  }}
                >
                  <FloatingCloud
                    text={thought.text}
                    top={thought.top}
                    left={thought.left}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <PixelSky />
      </main>
      <Footer />
    </>
  )
}

export default App













