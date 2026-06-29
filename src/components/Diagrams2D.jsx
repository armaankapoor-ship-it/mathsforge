import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

function defs(color = '#145c70') {
  return (
    <defs>
      <marker id={`arrow-${color.replace('#', '')}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill={color} />
      </marker>
    </defs>
  )
}

function Arrow({ x1, y1, x2, y2, color = '#145c70', width = 4, dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed ? '7 7' : undefined}
      markerEnd={`url(#arrow-${color.replace('#', '')})`}
    />
  )
}

export function VectorDiagram({ kind = 'components' }) {
  const base = {
    components: (
      <>
        <Arrow x1="70" y1="230" x2="245" y2="95" color="#145c70" />
        <line x1="70" y1="230" x2="245" y2="230" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="245" y1="230" x2="245" y2="95" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
        <text x="148" y="252">Ax</text>
        <text x="255" y="166">Ay</text>
        <text x="174" y="135">A</text>
      </>
    ),
    triangle: (
      <>
        <Arrow x1="70" y1="225" x2="190" y2="130" color="#14b8a6" />
        <Arrow x1="190" y1="130" x2="300" y2="195" color="#f59e0b" />
        <Arrow x1="70" y1="225" x2="300" y2="195" color="#f97316" width="5" />
        <text x="120" y="165">A</text>
        <text x="245" y="145">B</text>
        <text x="175" y="235">A + B</text>
      </>
    ),
    parallelogram: (
      <>
        <polygon points="70,225 190,125 310,165 190,265" fill="#14b8a6" opacity=".16" stroke="#0f766e" strokeWidth="2" />
        <Arrow x1="70" y1="225" x2="190" y2="125" color="#14b8a6" />
        <Arrow x1="70" y1="225" x2="190" y2="265" color="#f59e0b" />
        <Arrow x1="70" y1="225" x2="310" y2="165" color="#f97316" width="5" />
        <text x="190" y="180">resultant</text>
      </>
    ),
    projection: (
      <>
        <Arrow x1="60" y1="230" x2="315" y2="230" color="#f59e0b" />
        <Arrow x1="60" y1="230" x2="205" y2="105" color="#145c70" />
        <Arrow x1="60" y1="230" x2="205" y2="230" color="#94a3b8" width="5" />
        <line x1="205" y1="105" x2="205" y2="230" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
        <text x="130" y="96">A</text>
        <text x="252" y="252">B</text>
        <text x="118" y="218">shadow</text>
      </>
    ),
    cross: (
      <>
        <polygon points="76,215 205,120 318,170 190,265" fill="#f97316" opacity=".18" stroke="#ea7a3a" strokeWidth="2" />
        <Arrow x1="76" y1="215" x2="205" y2="120" color="#14b8a6" />
        <Arrow x1="76" y1="215" x2="190" y2="265" color="#f59e0b" />
        <Arrow x1="190" y1="188" x2="190" y2="70" color="#2563eb" width="5" />
        <text x="198" y="82">A x B</text>
        <text x="212" y="202">area</text>
      </>
    ),
    axes3d: (
      <>
        <Arrow x1="90" y1="225" x2="310" y2="225" color="#ea7a3a" />
        <Arrow x1="90" y1="225" x2="90" y2="55" color="#0f766e" />
        <Arrow x1="90" y1="225" x2="220" y2="140" color="#2563eb" />
        <Arrow x1="90" y1="225" x2="260" y2="90" color="#145c70" width="5" />
        <line x1="260" y1="90" x2="260" y2="225" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
        <text x="315" y="230">x</text>
        <text x="75" y="58">z</text>
        <text x="224" y="145">y</text>
      </>
    ),
    parallel: (
      <>
        <Arrow x1="70" y1="110" x2="300" y2="110" color="#145c70" />
        <Arrow x1="95" y1="190" x2="255" y2="190" color="#f59e0b" />
        <text x="142" y="92">same direction</text>
        <text x="124" y="174">parallel</text>
      </>
    ),
  }

  return (
    <svg className="diagram-svg" viewBox="0 0 380 310" role="img" aria-label={`${kind} vector diagram`}>
      {defs('#145c70')}
      {defs('#14b8a6')}
      {defs('#f59e0b')}
      {defs('#f97316')}
      {defs('#2563eb')}
      {defs('#94a3b8')}
      <rect x="20" y="25" width="340" height="255" rx="22" fill="currentColor" opacity=".045" />
      <line x1="45" y1="245" x2="335" y2="245" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="45" y1="245" x2="45" y2="55" stroke="#cbd5e1" strokeWidth="1" />
      {base[kind] || base.components}
    </svg>
  )
}

export function DiagramBank({ diagrams }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return diagrams
    return diagrams.filter((diagram) =>
      [diagram.title, diagram.concept, diagram.type].join(' ').toLowerCase().includes(q),
    )
  }, [diagrams, query])

  return (
    <>
      <label className="search-box">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search diagrams: projection, cross, 3D..." />
      </label>
      <div className="diagram-grid">
        {filtered.map((diagram) => (
          <article className="diagram-card" key={diagram.id}>
            <VectorDiagram kind={diagram.render} />
            <div className="p-5">
              <p className="micro-label">{diagram.type}</p>
              <h3>{diagram.title}</h3>
              <p>{diagram.what}</p>
              <div className="mt-4 grid gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Removes: {diagram.confusionRemoved}</span>
                <span>Paper method: {diagram.paperMethod}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
