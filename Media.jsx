import { useEffect, useRef, useState } from 'react'

// Image or video on a quiet plate. If an image can't load, the plate stays as a typographic stand-in.
export function Media({ src, alt = '', ratio, plate, video, poster, screen, className = '', style, fit }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!video || !ref.current) return
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [video])

  return (
    <div
      className={`media ${screen ? 'media--screen' : ''} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {(failed || plate) && (
        <div className="media__plate" aria-hidden={!failed}>
          <span className="mono">{plate?.meta}</span>
          <b>{plate?.title}</b>
        </div>
      )}
      {video ? (
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={alt} style={fit ? { objectFit: fit } : undefined} />
      ) : (
        !failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            style={fit ? { objectFit: fit } : undefined}
          />
        )
      )}
    </div>
  )
}

export function Meta({ items }) {
  return (
    <div className="meta">
      {items.filter(Boolean).map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  )
}
