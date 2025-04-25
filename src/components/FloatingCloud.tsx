import { motion } from 'framer-motion'

type FloatingCloudProps = {
    text: string
    top?: string 
    left?: string
  }
  

const FloatingCloud: React.FC<FloatingCloudProps> = ({ text, top, left }) => {
  const width = Math.min(Math.max(text.length * 10, 120), 240)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ top, left }}
      animate={{
        x: [0, 10, -10, 0],
        y: [0, -5, 5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: 'easeInOut',
      }}
    >
      <div
        className="relative drop-shadow-md transition-transform hover:scale-105 duration-500"
        style={{ width: `${width}px` }}
      >
        <img
          src="src/assets/special-3d-rendering-smooth-clouds-flowing-shapes-isolated-transparent-backgrounds-png.webp"
          alt="cloud"
          className="w-full h-auto"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-800 font-medium text-center px-2">
          {text}
        </span>
      </div>
    </motion.div>
  )
}

export default FloatingCloud





