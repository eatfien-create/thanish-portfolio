import { person, capabilities, stack, experience } from '../content.js'
import SectionHead from './SectionHead.jsx'
import { Media } from './Media.jsx'
import { ImageReveal, Reveal } from './motion.jsx'

export default function Info() {
  return (
    <section className="sec rail" id="info">
      <SectionHead idx="04" label="Info" title="About Me." />

      <div className="info">
        <ImageReveal className="info__portrait">
          <Media src={person.portrait} alt="Portrait of Thanish Thahir" ratio="3 / 4" plate={{ title: 'Thanish Thahir', meta: 'Portrait' }} />
        </ImageReveal>
        <Reveal className="info__text">
          <p className="lede" style={{ maxWidth: '30ch', color: 'var(--ink)' }}>
            A designer and engineer working on product concepts, visual systems and interface ideas.
          </p>
          <p className="body">
            I design with intention rather than decoration, so the look serves meaning, function and real human use.
            Increasingly that means building the thing too: wiring the sensor, writing the firmware, and designing
            the screen that makes the data make sense.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="pill" href={person.cv} target="_blank" rel="noreferrer">Download CV</a>
            <a className="pill pill--ghost" href="#contact">Get in touch</a>
          </div>
        </Reveal>
      </div>

      <div className="caps">
        {capabilities.map((c, i) => (
          <Reveal className="cap" key={c.t} delay={i * 0.05}>
            <Media src={c.image} alt="" plate={{ title: c.t, meta: 'Capability' }} />
            <span className="mono cap__n">0{i + 1}</span>
            <h3 className="h3">{c.t}</h3>
            <p className="body" style={{ fontSize: 'var(--t-small)' }}>{c.d}</p>
          </Reveal>
        ))}
      </div>

      <div className="ledger">
        <Reveal className="ledger__col ledger__col--a">
          <p className="mono mute" style={{ marginBottom: 14 }}>Experience</p>
          {experience.map((e) => (
            <div className="row" key={e.org}>
              <span className="h3" style={{ fontSize: '1.125rem' }}>{e.role}</span>
              <span className="row__org mute">{e.org}</span>
              <span className="row__when mono mute">{e.when}</span>
              <p className="row__d">{e.d}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="ledger__col ledger__col--b" delay={0.08}>
          <p className="mono mute" style={{ marginBottom: 14 }}>Tools</p>
          {stack.map(([k, v]) => (
            <div className="stackrow" key={k}>
              <span className="mono mute" style={{ paddingTop: 2 }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
