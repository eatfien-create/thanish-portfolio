import { useState } from 'react'
import { person } from '../content.js'
import { Reveal } from './motion.jsx'

function Copy({ text }) {
  const [done, setDone] = useState(false)
  const go = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {
      const r = document.createRange()
      const el = document.getElementById('email-text')
      if (el) { r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r) }
    }
  }
  return (
    <button className="copybtn" onClick={go} aria-live="polite">{done ? 'Copied' : 'Copy'}</button>
  )
}

export default function Contact() {
  return (
    <footer className="contact rail" id="contact">
      <span className="mono mute">05 — Contact</span>
      <Reveal>
        <a className="display contact__big" href={`mailto:${person.email}`} style={{ marginTop: 16 }}>
          Let’s Talk<span className="arr" aria-hidden="true">↗</span>
        </a>
      </Reveal>
      <div className="contact__grid">
        <div>
          <span className="mono mute">Email</span>
          <span className="copyline">
            <a id="email-text" className="ulink h3" href={`mailto:${person.email}`}>{person.email}</a>
            <Copy text={person.email} />
          </span>
        </div>
        <div>
          <span className="mono mute">Phone</span>
          <a className="ulink" href={person.phoneHref} style={{ justifySelf: 'start' }}>{person.phone}</a>
          <span className="mute" style={{ fontSize: 'var(--t-small)' }}>{person.based}</span>
        </div>
        <div>
          <span className="mono mute">Elsewhere</span>
          {person.socials.map((s) => (
            <a key={s.href} className="ulink" href={s.href} target="_blank" rel="noreferrer" style={{ justifySelf: 'start' }}>
              {s.label} <span className="mute">{s.handle}</span> ↗
            </a>
          ))}
        </div>
      </div>
      <div className="foot mono mute">
        <span>Designed &amp; built by Thanish</span>
        <span>© 2026</span>
        <a href="#top" className="ulink">Back to top ↑</a>
      </div>
    </footer>
  )
}
