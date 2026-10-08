import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1]

// Content stays visible at rest; motion only adds a short settle as it enters view.
export function Reveal({ children, delay = 0, y = 24, as = 'div', className, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ y, opacity: 0.35 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Images open from a slight inset mask and settle from a gentle zoom.
export function ImageReveal({ children, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: 'inset(6% 4% 6% 4%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease }}
    >
      <motion.div
        style={{ height: '100%' }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.6, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Hero lines rise out of their own mask on first load.
export function Lines({ lines, className, delay = 0.1 }) {
  return (
    <h1 className={className} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span className="line" key={i} aria-hidden="true">
          <motion.span
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

// Slight vertical drift tied to scroll position.
export function Parallax({ children, amount = 60, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
