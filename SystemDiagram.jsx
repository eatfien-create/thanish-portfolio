import { useEffect, useState } from 'react'

// Task 04 signal path: sensors → ESP32 → relay, and ESP32 ⇄ Firebase ⇄ dashboard.
function Node({ x, y, w = 150, h = 60, title, sub, accent }) {
  return (
    <g>
      <rect className={`n ${accent ? 'n--a' : ''}`} x={x} y={y} width={w} height={h} rx="4" />
      <text className={`t ${accent ? 't--inv' : ''}`} x={x + 14} y={y + 26}>{title}</text>
      <text className="s" x={x + 14} y={y + 45} style={accent ? { fill: 'var(--paper)', opacity: 0.6 } : undefined}>{sub}</text>
    </g>
  )
}

const wires = [
  { id: 'w1', d: 'M170 70 C 210 70, 210 130, 250 130' },
  { id: 'w2', d: 'M170 180 C 210 180, 210 160, 250 160' },
  { id: 'w3', d: 'M335 190 L 335 240' },
  { id: 'w4', d: 'M420 145 L 500 145', dash: true },
  { id: 'w5', d: 'M650 145 L 730 145', dash: true },
]

export default function SystemDiagram() {
  const [anim, setAnim] = useState(true)
  useEffect(() => {
    setAnim(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return (
    <div className="diagram" role="img" aria-label="DHT11 and LDR feed an ESP32, which drives a relay and bulb, and syncs over Wi-Fi with Firebase Realtime Database, which the web dashboard reads and writes.">
      <svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg">
        {wires.map((w) => (
          <path key={w.id} id={w.id} className={`w ${w.dash ? 'w--dash' : ''}`} d={w.d} />
        ))}
        <Node x={20} y={40} title="DHT11" sub="GPIO 4 · Temp · RH" />
        <Node x={20} y={150} title="LDR" sub="GPIO 34 · ADC" />
        <Node x={250} y={105} w={170} h={85} title="ESP32" sub="Samples every 3 s" accent />
        <Node x={260} y={240} title="Relay → bulb" sub="GPIO 5" />
        <Node x={500} y={115} title="Firebase" sub="Realtime Database" />
        <Node x={730} y={115} title="Dashboard" sub="Hosting · Auth" />
        <text className="s" x={438} y={135}>Wi-Fi</text>
        <text className="s" x={500} y={205}>/sensorData/*</text>
        <text className="s" x={500} y={222}>/appliances/bulbState</text>
        <text className="s" x={730} y={205}>Live cards · override</text>
        {anim &&
          ['w1', 'w2', 'w4', 'w5'].map((id, i) => (
            <circle key={id} r="3.5" className="pkt">
              <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          ))}
      </svg>
    </div>
  )
}
