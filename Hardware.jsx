import { Fragment, useCallback, useEffect, useState } from 'react'
import { hardware } from '../content.js'
import SectionHead from './SectionHead.jsx'
import Track, { SpecModal } from './Track.jsx'
import IotMenu from './IotMenu.jsx'
import { Media } from './Media.jsx'
import { Reveal } from './motion.jsx'

function Builds() {
  return (
    <div className="builds-wrap" id="iot-beyond">
      <div className="sechead" style={{ paddingBottom: 28 }}>
        <span className="sechead__idx mono mute">Also building</span>
        <h3 className="sechead__title display h2">Beyond the track.</h3>
      </div>
      <div className="builds">
        {hardware.builds.map((b, i) => (
          <Reveal className="build" key={b.id} delay={i * 0.06}>
            <div className="build__top">
              <span className="mono mute">{b.context}</span>
              <span className="mono status"><span className="dot" />{b.status}</span>
            </div>
            {b.video && (
              <Media video src={b.video.src} poster={b.video.poster} ratio={b.video.ratio} alt={b.title} style={{ borderRadius: 4 }} />
            )}
            <h3 className="display h2">{b.title}</h3>
            <p className="body">{b.line}</p>
            {b.facts.length > 0 && (
              <dl className="kv">
                {b.facts.map(([k, v]) => (
                  <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>
                ))}
              </dl>
            )}
            <p className="mono mute">{b.stack}</p>
            {b.href && (
              <a className="ulink" href={b.href} target="_blank" rel="noreferrer" style={{ justifySelf: 'start' }}>
                Open dashboard ↗
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function Hardware() {
  // open task lives in the URL hash (#task-01) so a specification can be linked directly
  const read = () => (location.hash.match(/^#task-(\d\d)$/) || [])[1] || null
  const [open, setOpen] = useState(null)
  useEffect(() => {
    setOpen(read())
    const on = () => setOpen(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const go = useCallback((n) => {
    setOpen(n)
    try { history.replaceState(null, '', n ? `#task-${n}` : location.pathname + location.search) } catch {}
  }, [])
  const close = useCallback(() => go(null), [go])
  return (
    <div className="hw-band" id="iot">
      <section className="sec rail">
        <SectionHead idx="02" label="IoT & Hardware" title="Things I’ve built." aside={hardware.intro} />
        <div className="iot">
          <IotMenu open={open} onOpen={go} />
          <div className="iot__body">
            <Track onOpen={go} />
            <Builds />
          </div>
        </div>
      </section>
      <SpecModal n={open} onClose={close} onGo={go} />
    </div>
  )
}
