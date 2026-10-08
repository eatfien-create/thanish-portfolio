import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

const Ctx = createContext(() => {})
export const useCursor = () => useContext(Ctx)

// A small label that follows the pointer over project imagery (fine pointers only).
export function CursorProvider({ children }) {
  const [label, setLabel] = useState(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX + 14); y.set(e.clientY + 14) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <Ctx.Provider value={setLabel}>
      {children}
      <AnimatePresence>
        {label && (
          <motion.div
            className="cursor"
            style={{ x: sx, y: sy }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

export const cursorProps = (set, label) => ({
  onMouseEnter: () => set(label),
  onMouseLeave: () => set(null),
})
