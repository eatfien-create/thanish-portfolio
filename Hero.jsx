import { motion } from 'framer-motion'
import { person } from '../content.js'
import { Lines, Parallax } from './motion.jsx'
import { Media } from './Media.jsx'

const ease = [0.16, 1, 0.3, 1]
const fade = (d) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: d } })

export default function Hero() {
  return (
    <section className="hero rail" id="top">
      <motion.div className="hero__top" {...fade(0.05)}>
        <span className="mono mute">Portfolio — 2026</span>
        <span className="mono mute">Designer &amp; Engineer · {person.based}</span>
      </motion.div>

      <Lines className="display hero__title" lines={['Hello!', 'I’m Thanish.']} />

      <div className="grid hero__grid">
        <motion.p className="lede hero__lede" {...fade(0.45)}>
          {person.tagline}
        </motion.p>

        <motion.div className="hero__roles" {...fade(0.55)}>
          <ul>
            {person.roles.map((r, i) => (
              <li key={r} className="h3">
                {r}
                {i < person.roles.length - 1 && <span className="mute">/</span>}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="hero__clip" {...fade(0.65)}>
          <Parallax amount={18}>
            <figure>
              <Media
                video
                src="media/bench-esp32-led.mp4"
                poster="media/bench-esp32-led.jpg"
                ratio="576 / 820"
                alt="An ESP32 board switching its LED from a phone web page"
                style={{ borderRadius: 4 }}
              />
              <figcaption className="mono mute">
                <span>On the bench</span>
                <span>ESP32 · Wi-Fi</span>
              </figcaption>
            </figure>
          </Parallax>
        </motion.div>
      </div>

      <motion.div className="hero__equation mono" {...fade(0.8)} aria-label="Design, code, hardware, prototyping, AI">
        {['Design', '×', 'Code', '×', 'Hardware', '×', 'Prototyping', '×', 'AI'].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </motion.div>
    </section>
  )
}
