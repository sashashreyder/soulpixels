import { useState } from 'react'
import { motion } from 'framer-motion'

type ThoughtCardProps = {
  text: string
  mood?: string
  comments?: string[]
  onDelete: () => void
  isExpanded: boolean
  onExpandToggle: () => void
  onAddComment: (comment: string) => void
}

export default function ThoughtCard({
  text,
  mood,
  comments = [],
  onDelete,
  isExpanded,
  onExpandToggle,
  onAddComment
}: ThoughtCardProps) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddComment(comment)
      setComment('')
    }
  }

  const moodColor = {
    '😊': 'bg-pink-100',
    '😔': 'bg-blue-50',
    '😡': 'bg-red-100',
    '🧘': 'bg-green-50',
    '🤯': 'bg-purple-50',
  }[mood || ''] || 'bg-yellow-50'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`
        relative ${moodColor}
        w-full ${isExpanded ? 'max-w-xl h-auto' : ''}
        min-h-36 p-4 rounded-3xl shadow-md shadow-gray-100 text-[15px] leading-relaxed text-gray-800
      `}
    >
      {!isExpanded && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      )}

      {mood && (
        <div className="absolute top-2 left-3 text-xl">{mood}</div>
      )}

<p className="whitespace-pre-wrap mt-6 font-hand text-gray-900 drop-shadow-sm">
  {text}
</p>


      {!isExpanded && (
        <button
          onClick={onExpandToggle}
          className="absolute bottom-2 right-3 text-xl text-gray-300 hover:text-white"
        >
          💬
        </button>
      )}

      {isExpanded && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md bg-white/70"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSubmit}
              className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition"
            >
              Submit
            </button>
            <button
              onClick={onExpandToggle}
              className="text-gray-300 underline"
            >
              Close
            </button>
          </div>
          {comments.length > 0 && (
            <div className="mt-4 space-y-2">
              {comments.map((c, i) => (
                <p
                  key={i}
                  className="bg-white/40 px-3 py-2 rounded-md text-sm"
                >
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}






  
  
  
  

  