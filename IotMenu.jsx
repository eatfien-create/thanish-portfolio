import { useEffect, useState } from 'react'
import { tasks, track } from '../track.js'

// The IoT section's own menu: a sticky rail on desktop, a sticky chip bar on phones.
// Section links scroll; assignment links open that task's specification.
function useSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids.join()])
  return active
}

const SECTIONS = ['iot-overview', 'iot-assignments', 'iot-beyond']

export default function IotMenu({ open, onOpen }) {
  const active = useSpy(SECTIONS)
  return (
    <>
      <nav className="iotmenu" aria-label="IoT menu">
        <div className="iotmenu__head">
          <span className="mono mute">IoT menu</span>
          <span className="mono iotmenu__count">{tasks.length} tasks</span>
        </div>
        <a href="#iot-overview" className={`iotmenu__sec ${active === 'iot-overview' ? 'is-on' : ''}`}>Overview</a>
        <a href="#iot-assignments" className={`iotmenu__sec ${active === 'iot-assignments' ? 'is-on' : ''}`}>Assignments</a>
        <ol className="iotmenu__tasks">
          {tasks.map((t) => (
            <li key={t.n}>
              <button className={`iotmenu__item ${open === t.n ? 'is-on' : ''}`} onClick={() => onOpen(t.n)} aria-haspopup="dialog">
                <span className="iotmenu__n mono">{t.n}</span>
                <span className="iotmenu__l">{t.step}</span>
                <span className="iotmenu__s">{t.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <a href="#iot-beyond" className={`iotmenu__sec ${active === 'iot-beyond' ? 'is-on' : ''}`}>Beyond the track</a>
        <p className="iotmenu__note mono mute">{track.name}</p>
      </nav>

      <nav className="iotbar" aria-label="IoT menu">
        <a href="#iot-overview" className="iotbar__chip">Overview</a>
        {tasks.map((t) => (
          <button key={t.n} className={`iotbar__chip ${open === t.n ? 'is-on' : ''}`} onClick={() => onOpen(t.n)}>
            <span className="mono">{t.n}</span>{t.step}
          </button>
        ))}
        <a href="#iot-beyond" className="iotbar__chip">Beyond</a>
      </nav>
    </>
  )
}
