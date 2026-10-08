import { useMemo, useState } from 'react'

const KW = new Set(('const let var function return if else while for export import from new true false null void int float bool char ' +
  'int8_t String struct class #include #define').split(' '))

// Tiny highlighter: comments, strings, preprocessor lines, keywords, numbers.
function tokenize(src) {
  const out = []
  const re = /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(^\s*#\w+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)|(\s+)|(.)/gm
  let m
  while ((m = re.exec(src))) {
    if (m[1]) out.push(['c', m[1]])
    else if (m[2]) out.push(['s', m[2]])
    else if (m[3]) out.push(['p', m[3]])
    else if (m[4]) out.push(['n', m[4]])
    else if (m[5]) out.push([KW.has(m[5]) ? 'k' : /^[A-Z][A-Z0-9_]+$/.test(m[5]) ? 'const' : 'i', m[5]])
    else out.push(['', m[0]])
  }
  return out
}

export default function Code({ file, lang, src }) {
  const [copied, setCopied] = useState(false)
  const tokens = useMemo(() => tokenize(src), [src])
  const lines = src.split('\n').length
  const copy = async () => {
    try { await navigator.clipboard.writeText(src); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* selection fallback is the visible code itself */ }
  }
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__file">{file}</span>
        <span className="code__lang">{lang} · {lines} lines</span>
        <button className="code__copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <div className="code__scroll" tabIndex={0} aria-label={`${file} source`}>
        <pre className="code__gutter" aria-hidden="true">{Array.from({ length: lines }, (_, i) => i + 1).join('\n')}</pre>
        <pre className="code__src"><code>{tokens.map(([t, v], i) => (t ? <span key={i} className={`tk-${t}`}>{v}</span> : v))}</code></pre>
      </div>
    </div>
  )
}
