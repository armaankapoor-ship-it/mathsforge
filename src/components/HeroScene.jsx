import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function addArrow(scene, direction, color, length, labelPosition) {
  const dir = new THREE.Vector3(...direction).normalize()
  const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), length, color, 0.28, 0.13)
  scene.add(arrow)
  if (labelPosition) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color }),
    )
    dot.position.set(...labelPosition)
    scene.add(dot)
  }
  return arrow
}

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.set(4.8, 4.2, 6.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const grid = new THREE.GridHelper(7, 14, 0x70b9c8, 0xb8d6dc)
    grid.material.transparent = true
    grid.material.opacity = 0.28
    group.add(grid)

    const axes = [
      [[1, 0, 0], 0xea7a3a, 3.2, [3.2, 0, 0]],
      [[0, 1, 0], 0x0f766e, 3.2, [0, 3.2, 0]],
      [[0, 0, 1], 0x2563eb, 3.2, [0, 0, 3.2]],
    ]
    axes.forEach(([direction, color, length, label]) => addArrow(group, direction, color, length, label))

    const vectorA = addArrow(group, [2.3, 1.4, 1.2], 0x14b8a6, 3.0)
    const vectorB = addArrow(group, [-1.0, 1.9, 1.8], 0xf59e0b, 2.8)
    const resultant = addArrow(group, [1.3, 3.3, 3.0], 0xf97316, 4.5)
    resultant.line.material.linewidth = 2

    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.3, 1.4, 1.2),
      new THREE.Vector3(1.3, 3.3, 3.0),
      new THREE.Vector3(-1, 1.9, 1.8),
    ]
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.concat(points[0]))
    const line = new THREE.Line(
      lineGeometry,
      new THREE.LineDashedMaterial({ color: 0x334155, dashSize: 0.1, gapSize: 0.08, transparent: true, opacity: 0.38 }),
    )
    line.computeLineDistances()
    group.add(line)

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
      group.rotation.y += 0.0025
      group.rotation.x = Math.sin(Date.now() * 0.00045) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />
}
