import { work, comingSoon } from '../content.js'
import SectionHead from './SectionHead.jsx'
import { Media, Meta } from './Media.jsx'
import { ImageReveal, Reveal } from './motion.jsx'
import { useCursor, cursorProps } from './Cursor.jsx'

function Kv({ p }) {
  return (
    <dl className="kv proj__kv">
      <dt>Role</dt><dd>{p.role}</dd>
      <dt>Stack</dt><dd>{p.stack}</dd>
    </dl>
  )
}

function Title({ p, size = 'h2' }) {
  return (
    <h3 className={`display ${size} proj__title`}>
      {p.title}
      <span className="proj__arrow" aria-hidden="true">↗</span>
    </h3>
  )
}

function Img({ p }) {
  return (
    <ImageReveal className="proj__media">
      <Media src={p.image} alt={p.title} ratio={p.ratio} plate={{ title: p.title, meta: `${p.context} · ${p.year}` }} />
    </ImageReveal>
  )
}

function Feature({ p }) {
  const set = useCursor()
  return (
    <a className="proj proj--feature" href={p.href} target="_blank" rel="noreferrer" {...cursorProps(set, 'View project ↗')}>
      <Img p={p} />
      <div className="proj__cap">
        <Reveal className="proj__t"><Title p={p} /></Reveal>
        <Reveal className="proj__sum" delay={0.05}>
          <Meta items={[p.category, p.context, `'${p.year.slice(2)}`]} />
          <p className="body" style={{ marginTop: 10 }}>{p.summary}</p>
        </Reveal>
        <Reveal className="proj__kvw" delay={0.1}><Kv p={p} /></Reveal>
      </div>
    </a>
  )
}

function Card({ p }) {
  const set = useCursor()
  return (
    <a className="proj" href={p.href} target="_blank" rel="noreferrer" {...cursorProps(set, 'View project ↗')}>
      <Img p={p} />
      <Reveal className="proj__cap">
        <div style={{ display: 'grid', gap: 10 }}>
          <Meta items={[p.category, p.context, `'${p.year.slice(2)}`]} />
          <Title p={p} size="h3" />
          <p className="body">{p.summary}</p>
        </div>
      </Reveal>
    </a>
  )
}

function Split({ p, reverse }) {
  const set = useCursor()
  return (
    <a className={`proj split ${reverse ? 'split--r' : ''}`} href={p.href} target="_blank" rel="noreferrer" {...cursorProps(set, 'View project ↗')}>
      <div className="proj__mediawrap"><Img p={p} /></div>
      <Reveal className="proj__text">
        <Meta items={[p.category, `'${p.year.slice(2)}`]} />
        <Title p={p} />
        <p className="body">{p.summary}</p>
        <Kv p={p} />
      </Reveal>
    </a>
  )
}

export default function Work() {
  const [feature, a, b, c, d] = work
  return (
    <section className="sec rail" id="work">
      <SectionHead
        idx="01"
        label="Selected work"
        title="Selected Work."
        aside="Product ideas, interfaces and visual systems — most of them made in and around the Nothing community."
      />
      <div className="work">
        <Feature p={feature} />
        <div className="pair">
          <Card p={a} />
          <Card p={b} />
        </div>
        <Split p={c} />
        <Split p={d} reverse />
        <Reveal>
          <a className="soon" href={comingSoon.href} target="_blank" rel="noreferrer">
            <span className="soon__t">
              <span className="display h3">{comingSoon.title}</span>
              <span className="proj__arrow" aria-hidden="true">↗</span>
            </span>
            <span className="soon__n mono mute">{comingSoon.note} · {comingSoon.context}</span>
            <span className="soon__w mono status"><span className="dot" />{comingSoon.when}</span>
            <span className="soon__thumb">
              <Media src={comingSoon.image} alt="" ratio="3 / 4" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
