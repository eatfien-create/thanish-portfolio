import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { person } from '../content.js'

const links = [
  ['Work', '#work'],
  ['IoT', '#iot'],
  ['Process', '#process'],
  ['Info', '#info'],
  ['Contact', '#contact'],
]

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const time = useClock()

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`nav ${solid || open ? 'is-solid' : ''}`}>
        <div className="rail nav__in">
          <a href="#top" className="nav__name" onClick={() => setOpen(false)}>
            <span className="dot" aria-hidden="true" />
            {person.name}
          </a>
          <nav className="nav__links" aria-label="Sections">
            {links.map(([l, h]) => (
              <a key={h} href={h}>{l}</a>
            ))}
          </nav>
          <span className="nav__clock mono" title="India Standard Time">{time} IST</span>
          <a className="pill" href={`mailto:${person.email}`}>Say hello</a>
          <button className="nav__menu" aria-expanded={open} aria-controls="sheet" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="sheet"
            className="sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map(([l, h], i) => (
              <motion.a
                key={h}
                href={h}
                className="big"
                onClick={() => setOpen(false)}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}.<span className="mono mute">0{i + 1}</span>
              </motion.a>
            ))}
            <div className="sheet__foot">
              <span className="mono mute">{time} IST</span>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
