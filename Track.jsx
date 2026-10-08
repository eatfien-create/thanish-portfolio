import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track, tasks } from '../track.js'
import Code from './Code.jsx'
import SystemDiagram from './SystemDiagram.jsx'
import { Media } from './Media.jsx'
import { Reveal } from './motion.jsx'
import { useCursor, cursorProps } from './Cursor.jsx'

const ease = [0.16, 1, 0.3, 1]

/* ---------------------------------------------------------------- spec tabs */

function Overview({ t }) {
  return (
    <div className="spec-ov">
      <section className="spec-sum">
        <span className="mono">Executive summary</span>
        <p>{t.summary}</p>
      </section>

      <section>
        <h4 className="spec-h">System architecture highlights</h4>
        <ul className="spec-hl">
          {t.highlights.map((h) => (
            <li key={h}><span className="tick" aria-hidden="true">✓</span>{h}</li>
          ))}
        </ul>
      </section>

      {t.diagram && (
        <section>
          <h4 className="spec-h">Signal path</h4>
          <SystemDiagram />
        </section>
      )}

      <section>
        <h4 className="spec-h">Key technical concepts</h4>
        <dl className="spec-concepts">
          {t.concepts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      <section>
        <h4 className="spec-h">Hardware & stack utilized</h4>
        <div className="case__stack" style={{ marginTop: 0 }}>
          {t.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>
      </section>

      <blockquote className="spec-reflect">
        <span className="mono">Engineering reflection & takeaway</span>
        <p>{t.reflection}</p>
      </blockquote>
    </div>
  )
}

function MediaTab({ t }) {
  const photos = t.media.filter((m) => m.type === 'image')
  const videos = t.media.filter((m) => m.type === 'video')
  return (
    <div className="spec-media">
      {photos.length > 0 && (
        <section>
          <h4 className="spec-h">Project photos & dashboard screenshots</h4>
          <div className="mg">
            {photos.map((m) => (
              <figure key={m.src} className={`mg__item ${m.wide ? 'is-wide' : ''} ${m.tall ? 'is-tall' : ''}`}>
                <Media screen={!m.tall} src={m.src} ratio={m.ratio} alt={m.caption} />
                <figcaption className="mono mute">{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {videos.length > 0 && (
        <section>
          <h4 className="spec-h">Video demonstrations</h4>
          <div className="spec-videos">
            {videos.map((m) => (
              <figure key={m.src} className="spec-video">
                <video src={m.src} poster={m.poster} controls playsInline muted preload="metadata" aria-label={m.caption} />
                <figcaption className="mono mute">{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- spec panel */

const TABS = [
  ['overview', 'Architecture & Overview', '◱'],
  ['code', 'Implementation Source Code', '</>'],
  ['media', 'Media (Photos & Videos)', '▣'],
]

export function SpecModal({ n, onClose, onGo }) {
  const t = tasks.find((x) => x.n === n)
  const i = tasks.findIndex((x) => x.n === n)
  const [tab, setTab] = useState('overview')
  const bodyRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => { setTab('overview'); bodyRef.current?.scrollTo(0, 0) }, [n])
  useEffect(() => { bodyRef.current?.scrollTo(0, 0) }, [tab])

  useEffect(() => {
    if (!n) return
    const prev = document.activeElement
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && e.altKey && i < tasks.length - 1) onGo(tasks[i + 1].n)
      if (e.key === 'ArrowLeft' && e.altKey && i > 0) onGo(tasks[i - 1].n)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.documentElement.style.overflow = ''
      prev?.focus?.()
    }
  }, [n, i, onClose, onGo])

  return (
    <AnimatePresence>
      {t && (
        <motion.div
          className="spec-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="spec"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-title"
            initial={{ y: 28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease }}
          >
            <header className="spec__head">
              <span className="spec__tag mono">Task {t.n}</span>
              <h3 id="spec-title" className="spec__title">{t.title}</h3>
              <button ref={closeRef} className="spec__x" onClick={onClose} aria-label="Close specification">✕</button>
            </header>

            <div className="spec__tabs" role="tablist" aria-label="Specification sections">
              {TABS.map(([k, l, ic]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={tab === k}
                  className={`spec__tab ${tab === k ? 'is-on' : ''}`}
                  onClick={() => setTab(k)}
                >
                  <span className="spec__ic" aria-hidden="true">{ic}</span>
                  {l}
                  {tab === k && <motion.span layoutId="spec-ul" className="tab__ul" transition={{ duration: 0.4, ease }} />}
                </button>
              ))}
            </div>

            <div className="spec__body" ref={bodyRef} role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={n + tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {tab === 'overview' && <Overview t={t} />}
                  {tab === 'code' && (
                    <div className="spec-code">
                      <div className="spec-code__meta mono">
                        <span className="mute">Language: {t.code.lang}</span>
                        <span className="spec-code__file">{t.code.file}</span>
                      </div>
                      <Code {...t.code} />
                    </div>
                  )}
                  {tab === 'media' && <MediaTab t={t} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="spec__foot">
              <span className="mono mute">{track.name} • Task {t.n}</span>
              <div className="spec__nav">
                <button className="pill pill--ghost" disabled={i === 0} onClick={() => onGo(tasks[i - 1].n)} aria-label="Previous task">←</button>
                <button className="pill pill--ghost" disabled={i === tasks.length - 1} onClick={() => onGo(tasks[i + 1].n)} aria-label="Next task">→</button>
                <button className="pill" onClick={onClose}>Close specification</button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------------------------------------------------------- assignment list */

function Assignment({ t, onOpen }) {
  const set = useCursor()
  const lead = t.media.find((m) => m.type === 'image') || t.media[0]
  const counts = [
    `${t.highlights.length} highlights`,
    `${t.code.src.split('\n').length} lines · ${t.code.lang}`,
    `${t.media.length} media`,
  ]
  return (
    <Reveal as="li" className="asg">
      <button className="asg__btn" onClick={() => onOpen(t.n)} {...cursorProps(set, 'Open specification')} aria-haspopup="dialog">
        <span className="asg__tag mono">Task {t.n}</span>
        <span className="asg__main">
          <span className="asg__step mono mute">{t.step}</span>
          <span className="asg__title">{t.title}</span>
          <span className="asg__short">{t.short}</span>
          <span className="asg__chips">
            {t.stack.slice(0, 3).map((s) => <span className="chip" key={s}>{s}</span>)}
          </span>
        </span>
        <span className="asg__meta mono mute">
          {counts.map((c) => <span key={c}>{c}</span>)}
        </span>
        <span className="asg__thumb">
          <Media src={lead.type === 'video' ? lead.poster : lead.src} alt="" ratio="4 / 3" />
        </span>
        <span className="asg__open">Open specification <span aria-hidden="true">→</span></span>
      </button>
    </Reveal>
  )
}

export default function Track({ onOpen }) {
  return (
    <div className="track">
      <div className="track__top" id="iot-overview">
        <span className="mono mute">{track.name}</span>
        <p className="body">{track.intro}</p>
        <div className="track__legend mono mute">
          <span>5 assignments</span>
          <span>Each with architecture, source code and media</span>
        </div>
      </div>
      <ol className="asgs" id="iot-assignments" aria-label="Assignments">
        {tasks.map((t) => <Assignment key={t.n} t={t} onOpen={onOpen} />)}
      </ol>
    </div>
  )
}
