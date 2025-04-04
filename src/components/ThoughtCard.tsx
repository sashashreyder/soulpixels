import { useState } from 'react'

type ThoughtCardProps = {
  text: string
  mood?: string
  onDelete: () => void
  isExpanded: boolean
  onExpandToggle: () => void
}

export default function ThoughtCard({
  text,
  mood,
  onDelete,
  isExpanded,
  onExpandToggle
}: ThoughtCardProps) {
  const [comment, setComment] = useState('')
  const [submittedComment, setSubmittedComment] = useState('')

  const moodColor = {
    '😊': 'bg-pink-100',
    '😔': 'bg-blue-50',
    '😡': 'bg-red-100',
    '🧘': 'bg-green-50',
    '🤯': 'bg-purple-50',
  }[mood || ''] || 'bg-yellow-50'

  const handleSubmit = () => {
    if (comment.trim()) {
      setSubmittedComment(comment)
      setComment('')
    }
  }

  return (
    
      <div
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

    
        <p className="whitespace-pre-wrap mt-6 font-hand">{text}</p>

       
        {!isExpanded && (
          <button
            onClick={onExpandToggle}
            className="absolute bottom-2 right-3 text-xl text-gray-500 hover:text-gray-700"
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
              className="w-full p-2 border rounded-md"
              rows={4}
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
                className="text-gray-600 underline"
              >
                Close
              </button>
            </div>
            {submittedComment && (
              <p className="mt-4 p-2 bg-white/60 rounded-md">{submittedComment}</p>
            )}
          </div>
        )}
      </div>
    
  )
}





  
  
  
  

  