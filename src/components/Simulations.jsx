import { useMemo, useState } from 'react'
import { Calculator, Compass, RotateCcw } from 'lucide-react'
import { MathLine } from './Math'

const simModes = [
  ['add2d', '2D addition'],
  ['add3d', '3D addition'],
  ['subtract', 'Subtraction'],
  ['scalar', 'Scalar'],
  ['dot', 'Dot product'],
  ['cross', 'Cross product'],
  ['projection', 'Projection'],
  ['direction', 'Direction cosines'],
]

const dot = (a, b) => a.x * b.x + a.y * b.y + (a.z || 0) * (b.z || 0)
const mag = (a) => Math.hypot(a.x, a.y, a.z || 0)
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: (a.z || 0) + (b.z || 0) })
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) })
const scale = (a, k) => ({ x: a.x * k, y: a.y * k, z: (a.z || 0) * k })
const cross = (a, b) => ({
  x: a.y * (b.z || 0) - (a.z || 0) * b.y,
  y: (a.z || 0) * b.x - a.x * (b.z || 0),
  z: a.x * b.y - a.y * b.x,
})
const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(2)
const vec = (v) => `(${fmt(v.x)}, ${fmt(v.y)}, ${fmt(v.z || 0)})`

function Slider({ label, value, onChange, min = -5, max = 5, step = 1 }) {
  return (
    <label className="lab-slider compact">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <b>{fmt(value)}</b>
    </label>
  )
}

function Arrow({ x1, y1, x2, y2, color, dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={dashed ? '6 6' : undefined}
      markerEnd={`url(#sim-arrow-${color.replace('#', '')})`}
    />
  )
}

function SimCanvas({ a, b, result, mode }) {
  const origin = { x: 170, y: 180 }
  const scalePx = 22
  const p = (v) => ({ x: origin.x + v.x * scalePx, y: origin.y - v.y * scalePx })
  const A = p(a)
  const B = p(b)
  const R = p(result)
  const bFromA = { x: A.x + b.x * scalePx, y: A.y - b.y * scalePx }
  const projScale = dot(a, b) / Math.max(dot(b, b), 0.0001)
  const projection = p(scale(b, projScale))
  return (
    <svg className="simulation-svg" viewBox="0 0 340 260" role="img" aria-label="Interactive vector simulation">
      <defs>
        {['#14b8a6', '#f59e0b', '#f97316', '#64748b', '#ef4444'].map((color) => (
          <marker key={color} id={`sim-arrow-${color.replace('#', '')}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill={color} />
          </marker>
        ))}
      </defs>
      <rect x="12" y="12" width="316" height="236" rx="18" fill="currentColor" opacity=".04" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={20 + i * 30} y1="25" x2={20 + i * 30} y2="235" stroke="#cbd5e1" opacity=".45" />
          <line x1="20" y1={25 + i * 20} x2="320" y2={25 + i * 20} stroke="#cbd5e1" opacity=".45" />
        </g>
      ))}
      <line x1="20" y1={origin.y} x2="320" y2={origin.y} stroke="#64748b" />
      <line x1={origin.x} y1="25" x2={origin.x} y2="235" stroke="#64748b" />
      <Arrow x1={origin.x} y1={origin.y} x2={A.x} y2={A.y} color="#14b8a6" />
      {mode === 'add2d' && <Arrow x1={A.x} y1={A.y} x2={bFromA.x} y2={bFromA.y} color="#f59e0b" />}
      {mode !== 'scalar' && <Arrow x1={origin.x} y1={origin.y} x2={B.x} y2={B.y} color="#f59e0b" />}
      {mode === 'projection' && (
        <>
          <Arrow x1={origin.x} y1={origin.y} x2={projection.x} y2={projection.y} color="#64748b" />
          <line x1={A.x} y1={A.y} x2={projection.x} y2={projection.y} stroke="#64748b" strokeDasharray="6 6" />
        </>
      )}
      {mode !== 'dot' && mode !== 'cross' && mode !== 'projection' && (
        <Arrow x1={origin.x} y1={origin.y} x2={R.x} y2={R.y} color={mode === 'subtract' ? '#ef4444' : '#f97316'} />
      )}
      <text x={A.x + 7} y={A.y - 7}>A</text>
      {mode !== 'scalar' && <text x={B.x + 7} y={B.y - 7}>B</text>}
      {mode !== 'dot' && mode !== 'cross' && mode !== 'projection' && <text x={R.x + 7} y={R.y - 7}>R</text>}
    </svg>
  )
}

export default function SimulationSuite() {
  const [mode, setMode] = useState('add2d')
  const [a, setA] = useState({ x: 3, y: 2, z: 1 })
  const [b, setB] = useState({ x: -1, y: 3, z: 2 })
  const [lambda, setLambda] = useState(1.5)

  const computed = useMemo(() => {
    const sum = add(a, b)
    const diff = sub(a, b)
    const scaled = scale(a, lambda)
    const d = dot(a, b)
    const c = cross(a, b)
    const projection = scale(b, d / Math.max(dot(b, b), 0.0001))
    const angle = mag(a) && mag(b) ? Math.acos(Math.max(-1, Math.min(1, d / (mag(a) * mag(b))))) * 180 / Math.PI : 0
    const directionCosines = mag(a)
      ? { l: a.x / mag(a), m: a.y / mag(a), n: (a.z || 0) / mag(a) }
      : { l: 0, m: 0, n: 0 }
    return { sum, diff, scaled, d, c, projection, angle, directionCosines }
  }, [a, b, lambda])

  const result = {
    add2d: computed.sum,
    add3d: computed.sum,
    subtract: computed.diff,
    scalar: computed.scaled,
    dot: computed.sum,
    cross: computed.sum,
    projection: computed.projection,
    direction: a,
  }[mode]

  const formula = {
    add2d: String.raw`\vec A+\vec B=(${fmt(computed.sum.x)},${fmt(computed.sum.y)})`,
    add3d: String.raw`\vec A+\vec B=${vec(computed.sum)}`,
    subtract: String.raw`\vec A-\vec B=${vec(computed.diff)}`,
    scalar: String.raw`\lambda\vec A=${vec(computed.scaled)}`,
    dot: String.raw`\vec A\cdot\vec B=${fmt(computed.d)},\quad \theta=${fmt(computed.angle)}^\circ`,
    cross: String.raw`\vec A\times\vec B=${vec(computed.c)},\quad |\vec A\times\vec B|=${fmt(mag(computed.c))}`,
    projection: String.raw`\operatorname{proj}_{B}A=${vec(computed.projection)}`,
    direction: String.raw`l=${fmt(computed.directionCosines.l)},\quad m=${fmt(computed.directionCosines.m)},\quad n=${fmt(computed.directionCosines.n)}`,
  }[mode]

  const reset = () => {
    setA({ x: 3, y: 2, z: 1 })
    setB({ x: -1, y: 3, z: 2 })
    setLambda(1.5)
  }

  return (
    <div className="simulation-shell">
      <div className="simulation-tabs">
        {simModes.map(([id, label]) => (
          <button key={id} className={mode === id ? 'active' : ''} onClick={() => setMode(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className="simulation-grid">
        <div className="simulation-stage">
          <SimCanvas a={a} b={b} result={result} mode={mode} />
        </div>
        <div className="simulation-panel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="micro-label">Interactive simulator</p>
              <h3>{simModes.find(([id]) => id === mode)?.[1]}</h3>
            </div>
            <button className="icon-button" onClick={reset} title="Reset simulation">
              <RotateCcw size={17} />
            </button>
          </div>
          <div className="component-grid">
            <Slider label="Ax" value={a.x} onChange={(x) => setA((v) => ({ ...v, x }))} />
            <Slider label="Ay" value={a.y} onChange={(y) => setA((v) => ({ ...v, y }))} />
            {(mode === 'add3d' || mode === 'cross' || mode === 'direction') && <Slider label="Az" value={a.z} onChange={(z) => setA((v) => ({ ...v, z }))} />}
            {mode !== 'scalar' && mode !== 'direction' && (
              <>
                <Slider label="Bx" value={b.x} onChange={(x) => setB((v) => ({ ...v, x }))} />
                <Slider label="By" value={b.y} onChange={(y) => setB((v) => ({ ...v, y }))} />
              </>
            )}
            {(mode === 'add3d' || mode === 'cross' || mode === 'dot' || mode === 'projection') && mode !== 'direction' && (
              <Slider label="Bz" value={b.z} onChange={(z) => setB((v) => ({ ...v, z }))} />
            )}
            {mode === 'scalar' && <Slider label="lambda" value={lambda} onChange={setLambda} min={-3} max={3} step={0.25} />}
          </div>
          <div className="formula-readout">
            <MathLine block>{formula}</MathLine>
          </div>
          <div className="insight-grid">
            <div>
              <Calculator size={18} />
              <strong>What CBSE can ask</strong>
              <span>Write the formula, substitute components, and present the final vector or scalar cleanly.</span>
            </div>
            <div>
              <Compass size={18} />
              <strong>What JEE can ask</strong>
              <span>Interpret signs, angle type, projection direction, and zero conditions without long calculation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
