import { Reveal } from './motion.jsx'

export default function SectionHead({ idx, label, title, aside }) {
  return (
    <div className="sechead">
      <span className="sechead__idx mono mute">
        {idx} — {label}
      </span>
      <Reveal as="h2" className="sechead__title display h1">
        {title}
      </Reveal>
      {aside && (
        <Reveal className="sechead__aside" delay={0.1}>
          <p className="body">{aside}</p>
        </Reveal>
      )}
    </div>
  )
}
