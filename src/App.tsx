import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Import components
import Header from './components/Header'
import Footer from './components/Footer'
import ThoughtCard from './components/ThoughtCard'
import PixelSky from './components/PixelSky'
import FloatingCloud from './components/FloatingCloud'



// Type for a ready thought
type Thought = {
  text: string
  mood?: string
  comments?: string[]
}

type RawThought = string | Thought // This type represents either a string or a full Thought object with text, mood, and comments

function App() {
  // Initialize thoughts from localStorage (if any), or set default ones
  
    const [thoughts, setThoughts] = useState<Thought[]>(() => {
    const stored = localStorage.getItem('soul-pixel-thoughts')
    const loadedThoughts = stored ? JSON.parse(stored) : [] // Load saved thoughts from localStorage

// Convert old string-only thoughts (like "hello") into full object format ({ text: "hello" })
// This keeps compatibility with data saved in earlier versions of the app
// If the item is a string — convert it to an object
// If the item is already an object (with mood or comments), leave it as it is 

    const convertedThoughts = loadedThoughts.map((item: RawThought) =>
      typeof item === 'string' ? { text: item } : item
    )

    // Return stored thoughts or default starter thoughts
    return convertedThoughts.length
      ? convertedThoughts
      : [
          { text: 'Sometimes fart is the loudest answer.' },
          { text: 'I love the smell of old socks.' },
          { text: "What if each pixel was someone's thought?" },
        ]
  })

  // Save thoughts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('soul-pixel-thoughts', JSON.stringify(thoughts))
  }, [thoughts])

  // New input text and mood selection
  const [newThought, setNewThought] = useState('')
  const [selectedMood, setSelectedMood] = useState('')

  // Index of the currently expanded card (or null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Handle form submission to add a new thought
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

          {/* Thought input form */}
          <form
            onSubmit={handleSubmit}
            className="mb-6 w-full max-w-xl flex gap-2"
          >
            {/* Mood select */}
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

            {/* Thought text input */}
            <input
              type="text"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Type your thought..."
              className="text-white flex-1 p-2 rounded border border-gray-300 shadow-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Submit button */}
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Add
            </button>
          </form>

          {/* Grid of thought cards */}
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
                    {/* Render one ThoughtCard */}
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

        {/* Floating pixel stars */}
        <PixelSky />
        {/* Floating clouds */}
       <FloatingCloud text="🌤 Feeling dreamy..." top="30%" left="10%" />
       <FloatingCloud text="💭 Just thinking..." top="55%" left="60%" />
      </main>

      <Footer />
    </>
  )
}

export default App











