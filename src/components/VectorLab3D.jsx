import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Eye, EyeOff, RotateCcw } from 'lucide-react'
import { MathLine } from './Math'

const modes = [
  ['addition', 'A + B'],
  ['subtraction', 'A - B'],
  ['scalar', 'lambda A'],
  ['dot', 'Dot'],
  ['projection', 'Projection'],
  ['cross', 'A x B'],
  ['right-hand', 'Right hand'],
  ['area-parallelogram', 'Area para'],
  ['area-triangle', 'Area tri'],
  ['direction-cosines', 'D. cosines'],
]

const colors = {
  a: 0x14b8a6,
  b: 0xf59e0b,
  result: 0xf97316,
  cross: 0x2563eb,
  projection: 0x94a3b8,
  negative: 0xef4444,
}

const toVec3 = (v) => new THREE.Vector3(v.x, v.y, v.z)
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z })
const scale = (a, k) => ({ x: a.x * k, y: a.y * k, z: a.z * k })
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z
const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
})
const mag = (a) => Math.hypot(a.x, a.y, a.z)
const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(2)
const vectorText = (name, v) => `${name} = ${fmt(v.x)}i ${v.y < 0 ? '-' : '+'} ${fmt(Math.abs(v.y))}j ${v.z < 0 ? '-' : '+'} ${fmt(Math.abs(v.z))}k`

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose?.()
    if (Array.isArray(child.material)) child.material.forEach((mat) => mat.dispose?.())
    else child.material?.dispose?.()
  })
}

function addArrow(group, vector, color, origin = new THREE.Vector3(0, 0, 0), lengthScale = 1) {
  const direction = vector.clone()
  const length = direction.length() * lengthScale
  if (length < 0.001) {
    const dotMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshStandardMaterial({ color }),
    )
    dotMesh.position.copy(origin)
    group.add(dotMesh)
    return dotMesh
  }
  direction.normalize()
  const arrow = new THREE.ArrowHelper(direction, origin, length, color, 0.28, 0.13)
  group.add(arrow)
  return arrow
}

function addLine(group, from, to, color = 0x64748b, dashed = false) {
  const geometry = new THREE.BufferGeometry().setFromPoints([from, to])
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.08, transparent: true, opacity: 0.72 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.72 })
  const line = new THREE.Line(geometry, material)
  if (dashed) line.computeLineDistances()
  group.add(line)
}

function addPlane(group, points, color, opacity) {
  const shape = new THREE.Shape()
  const [p0, ...rest] = points
  shape.moveTo(p0.x, p0.z)
  rest.forEach((point) => shape.lineTo(point.x, point.z))
  shape.lineTo(p0.x, p0.z)

  const geometry = new THREE.BufferGeometry()
  const vertices = []
  if (points.length === 3) {
    vertices.push(points[0], points[1], points[2])
  } else {
    vertices.push(points[0], points[1], points[2], points[0], points[2], points[3])
  }
  geometry.setFromPoints(vertices)
  geometry.setIndex(points.length === 3 ? [0, 1, 2] : [0, 1, 2, 3, 4, 5])
  geometry.computeVertexNormals()
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)
}

function Slider({ label, value, onChange, min = -4, max = 4, step = 1 }) {
  return (
    <label className="lab-slider">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <b>{fmt(value)}</b>
    </label>
  )
}

export default function VectorLab3D() {
  const mountRef = useRef(null)
  const runtimeRef = useRef(null)
  const [mode, setMode] = useState('addition')
  const [a, setA] = useState({ x: 2, y: 1, z: 2 })
  const [b, setB] = useState({ x: -1, y: 3, z: 1 })
  const [lambda, setLambda] = useState(1.5)
  const [showGrid, setShowGrid] = useState(true)
  const [showProjection, setShowProjection] = useState(true)
  const [showFormula, setShowFormula] = useState(true)

  const computed = useMemo(() => {
    const sum = add(a, b)
    const diff = sub(a, b)
    const negB = scale(b, -1)
    const scaled = scale(a, lambda)
    const d = dot(a, b)
    const crossAB = cross(a, b)
    const bMag2 = dot(b, b)
    const projection = bMag2 === 0 ? { x: 0, y: 0, z: 0 } : scale(b, d / bMag2)
    const angle = mag(a) && mag(b) ? Math.acos(Math.max(-1, Math.min(1, d / (mag(a) * mag(b))))) * 180 / Math.PI : 0
    const dc = mag(a) ? { l: a.x / mag(a), m: a.y / mag(a), n: a.z / mag(a) } : { l: 0, m: 0, n: 0 }
    return { sum, diff, negB, scaled, d, crossAB, projection, angle, dc }
  }, [a, b, lambda])

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(6, 5.2, 7)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.target.set(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.72))
    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(4, 8, 6)
    scene.add(light)

    const staticGroup = new THREE.Group()
    const dynamicGroup = new THREE.Group()
    scene.add(staticGroup, dynamicGroup)

    addArrow(staticGroup, new THREE.Vector3(4, 0, 0), colors.result)
    addArrow(staticGroup, new THREE.Vector3(0, 4, 0), colors.a)
    addArrow(staticGroup, new THREE.Vector3(0, 0, 4), 0x2563eb)
    const grid = new THREE.GridHelper(8, 16, 0x94a3b8, 0xcbd5e1)
    grid.material.transparent = true
    grid.material.opacity = 0.34
    staticGroup.add(grid)

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      camera.aspect = rect.width / Math.max(rect.height, 1)
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    runtimeRef.current = { dynamicGroup, grid }
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      disposeObject(staticGroup)
      disposeObject(dynamicGroup)
      controls.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
      runtimeRef.current = null
    }
  }, [])

  useEffect(() => {
    const runtime = runtimeRef.current
    if (!runtime) return
    const { dynamicGroup, grid } = runtime
    grid.visible = showGrid
    while (dynamicGroup.children.length) {
      const child = dynamicGroup.children.pop()
      disposeObject(child)
    }

    const A = toVec3(a)
    const B = toVec3(b)
    const origin = new THREE.Vector3(0, 0, 0)
    addArrow(dynamicGroup, A, colors.a)

    if (mode !== 'scalar' && mode !== 'direction-cosines') addArrow(dynamicGroup, B, colors.b)

    if (mode === 'addition') {
      addArrow(dynamicGroup, B, colors.b, A)
      addArrow(dynamicGroup, toVec3(computed.sum), colors.result)
      addLine(dynamicGroup, A, toVec3(computed.sum), colors.b, true)
    }
    if (mode === 'subtraction') {
      addArrow(dynamicGroup, toVec3(computed.negB), colors.negative)
      addArrow(dynamicGroup, toVec3(computed.diff), colors.result)
      addLine(dynamicGroup, B, A, colors.result, true)
    }
    if (mode === 'scalar') {
      addArrow(dynamicGroup, toVec3(computed.scaled), colors.result)
    }
    if (mode === 'dot' || mode === 'projection') {
      if (showProjection) {
        const P = toVec3(computed.projection)
        addArrow(dynamicGroup, P, colors.projection)
        addLine(dynamicGroup, A, P, colors.projection, true)
      }
    }
    if (mode === 'cross' || mode === 'right-hand' || mode === 'area-parallelogram' || mode === 'area-triangle') {
      const C = toVec3(computed.crossAB)
      const crossVector = C.length() ? C.normalize().multiplyScalar(Math.min(3.4, Math.max(1.3, Math.sqrt(mag(computed.crossAB)) / 2))) : C
      addArrow(dynamicGroup, crossVector, colors.cross)
      if (mode === 'area-parallelogram') addPlane(dynamicGroup, [origin, A, A.clone().add(B), B], colors.result, 0.2)
      if (mode === 'area-triangle') addPlane(dynamicGroup, [origin, A, B], colors.result, 0.25)
    }
    if (mode === 'direction-cosines') {
      addLine(dynamicGroup, new THREE.Vector3(a.x, 0, 0), A, colors.projection, true)
      addLine(dynamicGroup, new THREE.Vector3(a.x, a.y, 0), A, colors.projection, true)
      addLine(dynamicGroup, origin, new THREE.Vector3(a.x, 0, 0), colors.result, true)
      addLine(dynamicGroup, new THREE.Vector3(a.x, 0, 0), new THREE.Vector3(a.x, a.y, 0), colors.a, true)
      addLine(dynamicGroup, new THREE.Vector3(a.x, a.y, 0), A, colors.cross, true)
    }
  }, [a, b, computed, mode, showGrid, showProjection, lambda])

  const formulaLines = {
    addition: [vectorText('A + B', computed.sum), String.raw`\vec A+\vec B=(a_1+b_1)\hat i+(a_2+b_2)\hat j+(a_3+b_3)\hat k`],
    subtraction: [vectorText('A - B', computed.diff), String.raw`\vec A-\vec B=\vec A+(-\vec B)`],
    scalar: [vectorText('lambda A', computed.scaled), String.raw`\lambda\vec A=\lambda a_1\hat i+\lambda a_2\hat j+\lambda a_3\hat k`],
    dot: [`A dot B = ${fmt(computed.d)}; angle = ${fmt(computed.angle)} degrees`, String.raw`\vec A\cdot\vec B=|A||B|\cos\theta`],
    projection: [vectorText('proj_B A', computed.projection), String.raw`\operatorname{proj}_{B}A=\frac{A\cdot B}{|B|^2}B`],
    cross: [vectorText('A x B', computed.crossAB), String.raw`|\vec A\times\vec B|=|\vec A||\vec B|\sin\theta`],
    'right-hand': [vectorText('A x B', computed.crossAB), String.raw`\vec B\times\vec A=-(\vec A\times\vec B)`],
    'area-parallelogram': [`Area = sqrt(${fmt(mag(computed.crossAB) ** 2)}) = ${fmt(mag(computed.crossAB))}`, String.raw`\text{Area}=|\vec A\times\vec B|`],
    'area-triangle': [`Area = ${fmt(mag(computed.crossAB) / 2)}`, String.raw`\text{Area}=\frac12|\vec A\times\vec B|`],
    'direction-cosines': [`l = ${fmt(computed.dc.l)}, m = ${fmt(computed.dc.m)}, n = ${fmt(computed.dc.n)}`, String.raw`l^2+m^2+n^2=1`],
  }

  const reset = () => {
    setA({ x: 2, y: 1, z: 2 })
    setB({ x: -1, y: 3, z: 1 })
    setLambda(1.5)
  }

  return (
    <div className="lab-shell">
      <div className="lab-toolbar">
        <div className="lab-tabs" role="tablist" aria-label="3D Vector Lab modes">
          {modes.map(([id, label]) => (
            <button key={id} type="button" className={mode === id ? 'active' : ''} onClick={() => setMode(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="lab-actions">
          <button type="button" className="icon-button" onClick={() => setShowGrid((value) => !value)} title="Show or hide grid">
            {showGrid ? <Eye size={17} /> : <EyeOff size={17} />}
          </button>
          <button type="button" className="icon-button" onClick={() => setShowProjection((value) => !value)} title="Show or hide projection lines">
            {showProjection ? 'Proj' : 'No'}
          </button>
          <button type="button" className="icon-button" onClick={reset} title="Reset vectors">
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      <div className="lab-grid">
        <div className="lab-stage">
          <div ref={mountRef} className="vector-canvas" />
          <div className="axis-label label-x">x</div>
          <div className="axis-label label-y">y</div>
          <div className="axis-label label-z">z</div>
        </div>
        <aside className="lab-panel">
          <div>
            <p className="micro-label">Movable vectors</p>
            <h3>{mode.replace('-', ' ')}</h3>
          </div>
          <div className="component-grid">
            <Slider label="Ax" value={a.x} onChange={(x) => setA((v) => ({ ...v, x }))} />
            <Slider label="Ay" value={a.y} onChange={(y) => setA((v) => ({ ...v, y }))} />
            <Slider label="Az" value={a.z} onChange={(z) => setA((v) => ({ ...v, z }))} />
            <Slider label="Bx" value={b.x} onChange={(x) => setB((v) => ({ ...v, x }))} />
            <Slider label="By" value={b.y} onChange={(y) => setB((v) => ({ ...v, y }))} />
            <Slider label="Bz" value={b.z} onChange={(z) => setB((v) => ({ ...v, z }))} />
            {mode === 'scalar' && <Slider label="lambda" value={lambda} onChange={setLambda} min={-3} max={3} step={0.25} />}
          </div>
          <button type="button" className="secondary-button w-full" onClick={() => setShowFormula((value) => !value)}>
            {showFormula ? 'Hide formula' : 'Show formula'}
          </button>
          {showFormula && (
            <div className="formula-readout">
              <strong>{formulaLines[mode][0]}</strong>
              <MathLine block>{formulaLines[mode][1]}</MathLine>
            </div>
          )}
          <div className="lab-note">
            <strong>What this visual teaches</strong>
            <span>{mode === 'dot' || mode === 'projection' ? 'Dot product measures shadow or along-effect.' : mode.includes('area') || mode === 'cross' ? 'Cross product measures perpendicular area effect.' : 'Component changes instantly reshape the final vector.'}</span>
          </div>
          <div className="lab-note warm">
            <strong>JEE trap</strong>
            <span>{mode === 'cross' || mode.includes('area') ? 'Switching A x B to B x A reverses direction.' : 'Always check whether the answer should be scalar or vector.'}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
