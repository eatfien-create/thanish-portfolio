import { protosem } from '../content.js'
import SectionHead from './SectionHead.jsx'
import { Reveal } from './motion.jsx'

export default function Process() {
  return (
    <section className="sec rail" id="process">
      <SectionHead
        idx="03"
        label="Protosem at Forge"
        title="Concepts before polish."
        aside="A weekly log from Protosem: thinking tools, electronics, CAD and digital fabrication, one week at a time."
      />
      <ol className="weeks" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {protosem.map((w, i) => (
          <Reveal as="li" className="week" key={w.w} delay={i * 0.05}>
            <span className="mono mute">Week</span>
            <span className="week__w">{w.w}</span>
            <h3 className="h3">{w.t}</h3>
            <p className="body" style={{ fontSize: 'var(--t-small)' }}>{w.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
