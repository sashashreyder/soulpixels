import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ThoughtCard from './components/ThoughtCard'
import PixelSky from './components/PixelSky'

type Thought = {
  text: string
  mood?: string
  comments?: string[]
}

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>(() => {
    const stored = localStorage.getItem('soul-pixel-thoughts')
    const parsed = stored ? JSON.parse(stored) : []
    const normalized = parsed.map((item: any) =>
      typeof item === 'string' ? { text: item } : item
    )
    return normalized.length
      ? normalized
      : [
          { text: 'Sometimes silence is the loudest answer.' },
          { text: 'I love the smell of old books.' },
          { text: "What if each pixel was someone's thought?" },
        ]
  })

  useEffect(() => {
    localStorage.setItem('soul-pixel-thoughts', JSON.stringify(thoughts))
  }, [thoughts])

  const [newThought, setNewThought] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newThought.trim()) {
      setThoughts([
        ...thoughts,
        { text: newThought.trim(), mood: selectedMood || undefined }
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
              className="appearance-none p-2 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-[url('data:image/svg+xml;utf8,<svg fill=\'%23666\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
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

          <div className="flex justify-center w-full">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full"
            >
              <AnimatePresence>
                {thoughts.map((thought, index) => (
                  <motion.div
                    key={thought.text + index}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThoughtCard
                      text={thought.text}
                      mood={thought.mood}
                      comments={thought.comments}
                      isExpanded={expandedIndex === index}
                      onExpandToggle={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      onDelete={() => {
                        const updated = thoughts.filter((_, i) => i !== index)
                        setThoughts(updated)
                        if (expandedIndex === index) setExpandedIndex(null)
                      }}
                      onAddComment={(newComment) => {
                        const updated = [...thoughts]
                        const current = updated[index]
                        if (!current.comments) current.comments = []
                        current.comments.push(newComment)
                        setThoughts(updated)
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <PixelSky />
      </main>
      <Footer />
    </>
  )
}

export default App










