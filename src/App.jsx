import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  FlaskConical,
  GitBranch,
  Layers3,
  Menu,
  Printer,
  Search,
  Sigma,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import sections from './data/sections.json'
import formulas from './data/formulas.json'
import derivations from './data/derivations.json'
import diagrams from './data/diagrams.json'
import questions from './data/questions.json'
import revision from './data/revision.json'
import tables from './data/tables.json'
import memoryTricks from './data/memoryTricks.json'
import DarkModeToggle from './components/DarkModeToggle'
import HeroScene from './components/HeroScene'
import VectorLab3D from './components/VectorLab3D'
import SimulationSuite from './components/Simulations'
import { DiagramBank, VectorDiagram } from './components/Diagrams2D'
import { ActionLink, FormulaCard, MetricCard, MiniFact, Pill, SectionShell } from './components/ui'
import { MathLine } from './components/Math'

const navItems = [
  ['home', 'Home'],
  ['map', 'Map'],
  ['notes', 'Notes'],
  ['formulas', 'Formulas'],
  ['derivations', 'Derivations'],
  ['diagrams', 'Diagrams'],
  ['lab', '3D Lab'],
  ['simulations', 'Simulations'],
  ['practice', 'Practice'],
  ['revision', 'Revision'],
  ['publish', 'Publish'],
]

function useLocalProgress() {
  const [done, setDone] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('mathsforge-progress') || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem('mathsforge-progress', JSON.stringify([...done]))
  }, [done])

  const toggle = (id) => {
    setDone((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return { done, toggle }
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('mathsforge-theme') === 'dark')
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useLocalProgress()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('mathsforge-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.2] })
    navItems.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7fbfc] text-ink transition-colors dark:bg-[#071016] dark:text-white">
      <Header dark={dark} setDark={setDark} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <TopicMap progress={progress} />
        <ConceptNotebook progress={progress} />
        <FormulaSheet />
        <DerivationBank />
        <DiagramSection />
        <VectorLabSection />
        <SimulationSection />
        <PracticeZone />
        <RevisionDashboard />
        <Manual3DSection />
        <PublishingSection />
      </main>
      <Footer />
    </div>
  )
}

function Header({ dark, setDark, active, menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#0c1820]/82">
        <a href="#home" className="flex items-center gap-3" aria-label="MathsForge home">
          <span className="brand-mark"><Sigma size={21} /></span>
          <span className="font-display text-sm font-black">MATHS<span>FORGE</span></span>
        </a>
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-skyglass px-3 py-2 text-[10px] font-black uppercase text-vector dark:bg-white/10 dark:text-mint sm:block">
            GitHub Pages ready
          </div>
          <DarkModeToggle dark={dark} onToggle={() => setDark((value) => !value)} />
          <button className="icon-button xl:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#0c1820]/95 sm:grid-cols-3 xl:hidden">
          {navItems.map(([id, label]) => (
            <a onClick={() => setMenuOpen(false)} key={id} href={`#${id}`} className={`nav-link py-3 ${active === id ? 'active' : ''}`}>{label}</a>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero-section scroll-mt-24">
      <HeroScene />
      <div className="hero-grid" />
      <div className="page-wrap relative z-10 flex min-h-[860px] flex-col justify-center pb-24 pt-32 md:min-h-[900px]">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-[11px] font-black uppercase text-vector shadow-line backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-mint">
            <Sparkles size={14} /> Class 12 CBSE - JEE Main - JEE Advanced foundation
          </div>
          <p className="font-mono text-xs font-bold uppercase text-vector/70 dark:text-mint/70">Vector Algebra / Public visual guide</p>
          <h1 className="hero-title">Vector Algebra, made visual.</h1>
          <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            A free, premium-feeling learning platform for vectors: original notes, formulas, derivations, SVG diagrams, interactive simulations, a movable Three.js 3D Vector Lab, and exam-ready practice.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#map">Start learning</ActionLink>
            <a className="secondary-button" href="#lab"><Layers3 size={17} /> Open 3D Vector Lab</a>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>44</strong><span>topic sections</span></div>
          <div><strong>390</strong><span>practice questions</span></div>
          <div><strong>35</strong><span>diagram plans</span></div>
          <div><strong>0</strong><span>paid services</span></div>
        </div>
      </div>
    </section>
  )
}

function TopicMap({ progress }) {
  const percent = Math.round((progress.done.size / sections.length) * 100)
  const clusters = [...new Set(sections.map((section) => section.cluster))]
  return (
    <SectionShell
      id="map"
      eyebrow="Complete topic map"
      title="One chapter, seven learning routes."
      description="Use this as the public homepage for classmates: it shows the full syllabus spine, progress, and how the project is organised."
      tint
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard Icon={BookOpen} value={sections.length} label="notes sections" detail="From basics to final revision." />
        <MetricCard Icon={Sigma} value={formulas.length} label="formula cards" detail="Meaning, examples, traps." />
        <MetricCard Icon={Target} value={`${percent}%`} label="revision progress" detail={`${progress.done.size} of ${sections.length} marked done.`} />
        <MetricCard Icon={GitBranch} value="Free" label="GitHub Pages" detail="Static frontend, no backend." />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-7">
        {clusters.map((cluster, index) => {
          const clusterSections = sections.filter((section) => section.cluster === cluster)
          const completed = clusterSections.filter((section) => progress.done.has(section.id)).length
          return (
            <article className="route-card" key={cluster}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{cluster}</h3>
              <p>{clusterSections.length} sections</p>
              <div className="progress-track"><i style={{ width: `${Math.round(completed / clusterSections.length * 100)}%` }} /></div>
            </article>
          )
        })}
      </div>
      <div className="mt-8 rounded-3xl bg-ink p-5 text-white shadow-soft dark:bg-white/10 md:p-8">
        <div className="grid gap-4 md:grid-cols-5">
          {['Vector basics', 'Operations', 'Components', 'Dot product', 'Cross product'].map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function ConceptNotebook({ progress }) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(sections[0].id)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections.filter((section) =>
      [section.title, section.cluster, section.simple, section.jeeHighYield].join(' ').toLowerCase().includes(q),
    )
  }, [query])
  const selected = sections.find((section) => section.id === selectedId) || filtered[0] || sections[0]
  const formulaMap = new Map(formulas.map((formula) => [formula.id, formula]))

  return (
    <SectionShell
      id="notes"
      eyebrow="Deep notes"
      title="Section-wise notebook with board and JEE lenses."
      description="Search, mark progress, and open any of the 44 sections. Each note includes definitions, formulas, visual ideas, memory hooks, mistakes, and exam traps."
    >
      <label className="search-box">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts: projection, direction cosines, triangle law..." />
      </label>
      <div className="notebook-layout">
        <aside className="notebook-list">
          {filtered.map((section) => (
            <button key={section.id} className={selected.id === section.id ? 'active' : ''} onClick={() => setSelectedId(section.id)}>
              <span>{String(section.number).padStart(2, '0')}</span>
              <strong>{section.title}</strong>
              <small>{section.cluster}</small>
            </button>
          ))}
        </aside>
        <article className="notebook-detail">
          <div className="notebook-hero">
            <div className="flex flex-wrap items-center gap-2">
              <Pill>{selected.cluster}</Pill>
              <button className="progress-button" onClick={() => progress.toggle(selected.id)}>
                <CheckCircle2 size={16} />
                {progress.done.has(selected.id) ? 'Done' : 'Mark done'}
              </button>
            </div>
            <h3>{selected.title}</h3>
            <p>{selected.simple}</p>
          </div>
          <div className="grid gap-4 p-5 md:p-7 lg:grid-cols-2">
            <MiniFact title="NCERT-level explanation" text={selected.ncert} />
            <MiniFact title="CBSE board writing" text={selected.cbse} />
            <MiniFact title="JEE Main pattern" text={selected.jeeMain} />
            <MiniFact title="JEE Advanced insight" text={selected.advanced} />
          </div>
          <div className="grid gap-5 border-t border-slate-200 p-5 dark:border-white/10 md:p-7 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h4>Definitions and meaning</h4>
              <ul className="clean-list">
                {selected.definitions.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <h4 className="mt-6">Visual plan</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(selected.visualPlan).slice(0, 6).map(([key, value]) => (
                  <MiniFact key={key} title={key} text={value} />
                ))}
              </div>
            </div>
            <div className="stack-panel">
              <h4>Important formulas</h4>
              {selected.formulas.map((id) => {
                const formula = formulaMap.get(id)
                if (!formula) return null
                return (
                  <div className="mini-formula" key={id}>
                    <strong>{formula.title}</strong>
                    <MathLine>{formula.latex}</MathLine>
                  </div>
                )
              })}
              <MiniFact title="Memory hook" text={selected.memoryHook} />
              <MiniFact title="Common mistakes" text={selected.commonMistakes.join(' ')} warm />
              <MiniFact title="Exam traps" text={selected.examTraps.join(' ')} warm />
            </div>
          </div>
        </article>
      </div>
    </SectionShell>
  )
}

function FormulaSheet() {
  return (
    <SectionShell
      id="formulas"
      eyebrow="Formula sheet"
      title="Formula cards that explain meaning, not just symbols."
      description="Every formula includes symbol meaning, geometry, algebra, physical interpretation where useful, examples, and a common trap."
      tint
    >
      <div className="formula-grid">
        {formulas.map((formula) => <FormulaCard formula={formula} key={formula.id} />)}
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {tables.map((table) => <RevisionTable table={table} key={table.title} />)}
      </div>
    </SectionShell>
  )
}

function RevisionTable({ table }) {
  return (
    <article className="table-card">
      <h3>{table.title}</h3>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>{table.columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, index) => (
              <tr key={index}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

function DerivationBank() {
  return (
    <SectionShell
      id="derivations"
      eyebrow="Derivation bank"
      title="Thirteen board-ready derivations."
      description="Each derivation starts from geometry or component algebra and ends with a highlighted final formula, shortcut, writing style, and warning."
    >
      <div className="derivation-grid">
        {derivations.map((derivation) => (
          <details className="derivation-card" key={derivation.id}>
            <summary>
              <span>{derivation.title}</span>
              <MathLine>{derivation.finalFormula}</MathLine>
            </summary>
            <ol>
              {derivation.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div className="grid gap-3 md:grid-cols-3">
              <MiniFact title="Meaning" text={derivation.geometry} />
              <MiniFact title="JEE shortcut" text={derivation.jeeShortcut} />
              <MiniFact title="CBSE writing" text={derivation.cbseWriting} />
            </div>
            <MiniFact title="Common mistake" text={derivation.commonMistake} warm />
          </details>
        ))}
      </div>
    </SectionShell>
  )
}

function DiagramSection() {
  return (
    <SectionShell
      id="diagrams"
      eyebrow="2D diagram bank"
      title="Original SVG diagram bank for paper and digital notes."
      description="Each visual explains what it shows, the labels required, the confusion it removes, how to draw it by hand, and how to build it digitally."
      tint
    >
      <DiagramBank diagrams={diagrams} />
    </SectionShell>
  )
}

function VectorLabSection() {
  return (
    <SectionShell
      id="lab"
      eyebrow="3D Vector Lab"
      title="Move vectors in 3D and watch formulas update."
      description="Rotate, zoom, and pan the coordinate system. Change components of A and B, toggle projection and grid, and switch between addition, subtraction, scalar multiplication, dot product, projection, cross product, right-hand rule, and area."
    >
      <VectorLab3D />
    </SectionShell>
  )
}

function SimulationSection() {
  return (
    <SectionShell
      id="simulations"
      eyebrow="Interactive simulations"
      title="Small fast simulators for exam intuition."
      description="These are frontend-only simulations. They use sliders, SVG, and live formulas, so the public site works without a backend, database, login, or paid API."
      tint
    >
      <SimulationSuite />
    </SectionShell>
  )
}

function PracticeZone() {
  const types = [...new Set(questions.map((question) => question.type))]
  const [type, setType] = useState(types[0])
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(12)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return questions.filter((question) => {
      const typeMatch = question.type === type
      if (!q) return typeMatch
      return typeMatch && [question.question, question.answer, question.conceptTag].join(' ').toLowerCase().includes(q)
    })
  }, [type, query])

  useEffect(() => setVisible(12), [type, query])

  return (
    <SectionShell
      id="practice"
      eyebrow="Practice question bank"
      title="390 original questions with answers, solutions, shortcuts, and traps."
      description="The bank includes 80 CBSE questions, 100 JEE Main questions, 40 advanced thinking problems, assertion-reason, integer type, match-the-column, diagram, 3D, dot product, cross product, and case-based questions."
    >
      <div className="practice-tabs">
        {types.map((item) => (
          <button key={item} className={type === item ? 'active' : ''} onClick={() => setType(item)}>
            {item}<span>{questions.filter((q) => q.type === item).length}</span>
          </button>
        ))}
      </div>
      <label className="search-box mt-5">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search current bank by concept or answer..." />
      </label>
      <div className="question-grid">
        {filtered.slice(0, visible).map((question) => <QuestionCard question={question} key={question.id} />)}
      </div>
      {visible < filtered.length && (
        <button className="secondary-button mx-auto mt-7" onClick={() => setVisible((value) => value + 12)}>
          Load more questions
        </button>
      )}
    </SectionShell>
  )
}

function QuestionCard({ question }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="question-card">
      <div className="flex flex-wrap gap-2">
        <Pill>{question.conceptTag}</Pill>
        <Pill>{question.difficulty}</Pill>
      </div>
      <h3>{question.question}</h3>
      {question.options && (
        <div className="option-list">
          {question.options.map((option) => <span key={option}>{option}</span>)}
        </div>
      )}
      <button className="secondary-button w-full" onClick={() => setOpen((value) => !value)}>
        {open ? 'Hide solution' : 'Show answer and solution'}
      </button>
      {open && (
        <div className="solution-box">
          <strong>Answer: {question.answer}</strong>
          <p>{question.solution}</p>
          <p><b>Shortcut:</b> {question.shortcut}</p>
          <p><b>Trap:</b> {question.commonTrap}</p>
        </div>
      )}
    </article>
  )
}

function RevisionDashboard() {
  return (
    <SectionShell
      id="revision"
      eyebrow="Revision dashboard"
      title="Final high-yield dashboard and printable sheet."
      description="Use this for the last day: top formulas, concepts, traps, diagrams, 3D ideas, question types, revision plans, and exam-hall strategy."
      tint
    >
      <div className="dashboard-grid">
        <DashboardList title="Top concepts" items={revision.top20Concepts.slice(0, 10)} Icon={Brain} />
        <DashboardList title="Top traps" items={revision.top15Traps} Icon={Target} />
        <DashboardList title="30-minute revision plan" items={revision.thirtyMinutePlan} Icon={ClipboardList} />
        <DashboardList title="Exam-hall strategy" items={revision.examHallStrategy} Icon={Sparkles} />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <MiniPanel title="Top 10 diagrams" items={revision.top10Diagrams} />
        <MiniPanel title="Top 10 3D visual ideas" items={revision.top10ThreeDIdeas} />
        <MiniPanel title="Top 10 question types" items={revision.top10QuestionTypes} />
      </div>
      <PrintableRevision />
    </SectionShell>
  )
}

function DashboardList({ title, items, Icon }) {
  return (
    <article className="dashboard-card">
      <Icon size={22} />
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  )
}

function MiniPanel({ title, items }) {
  return (
    <article className="mini-panel">
      <h3>{title}</h3>
      <div className="grid gap-2">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </article>
  )
}

function PrintableRevision() {
  return (
    <article className="print-sheet" id="printable-sheet">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="micro-label">Printable one-page revision sheet</p>
          <h3>Vectors in one scan.</h3>
          <p>Print this section before exams. It condenses formulas, meaning, traps, memory hooks, and final checklist.</p>
        </div>
        <button className="primary-button print-hide" onClick={() => window.print()}><Printer size={17} /> Print sheet</button>
      </div>
      <div className="print-grid">
        <div>
          <h4>Core formulas</h4>
          {revision.top25Formulas.slice(0, 12).map((formula) => (
            <div className="print-formula" key={formula.title}>
              <strong>{formula.title}</strong>
              <MathLine>{formula.latex}</MathLine>
            </div>
          ))}
        </div>
        <div>
          <h4>Memory hooks</h4>
          <ul>{memoryTricks.map(([title, trick]) => <li key={title}><b>{title}:</b> {trick}</li>)}</ul>
          <h4>Final checklist</h4>
          <ul>{revision.finalChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </article>
  )
}

function Manual3DSection() {
  const methods = [
    ['Paper and Pencil 3D Axes', 'Draw x-axis diagonally down-right, y-axis horizontally, and z-axis upward. Mark O, move along x, then y, then z, and join origin to the final point with dotted component lines.'],
    ['Straw or Stick Model', 'Use three sticks for axes, clay as origin, and colored thread for A, B, A+B, A-B, and A x B. Place vectors head-to-tail physically.'],
    ['GeoGebra 3D Calculator', 'Use free GeoGebra 3D Calculator commands such as Vector((0,0,0),(a,b,c)), Dot(u,v), and Cross(u,v), then rotate the scene.'],
    ['Blender Basic 3D Model', 'Use free Blender cylinders and cones for axes and vector arrows. Add text labels and animate arrows appearing one by one.'],
    ['DIY Notebook 3D Illusion', 'Use isometric grid, shade parallelogram area for cross product, and draw projection shadows for dot product.'],
  ]

  return (
    <SectionShell
      id="manual-3d"
      eyebrow="Make visuals yourself"
      title="How to make 3D vector visuals yourself for free."
      description="These non-coding methods help students rebuild the visuals in notebooks, models, GeoGebra, or Blender without spending anything."
    >
      <div className="manual-grid">
        {methods.map(([title, text], index) => (
          <article className="manual-card" key={title}>
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

function PublishingSection() {
  return (
    <SectionShell
      id="publish"
      eyebrow="Public website"
      title="Built to publish free through GitHub Pages."
      description="This project is a static frontend. It can be uploaded to a public GitHub repository and shared through a normal public GitHub Pages link."
      tint
    >
      <div className="publish-card">
        <GitBranch size={28} />
        <h3>Public link format</h3>
        <p>After deployment, your shareable link will look like:</p>
        <code>https://your-github-username.github.io/your-repository-name/</code>
        <p>The README includes beginner-friendly steps for creating a free GitHub account, creating a public repository, uploading files, installing dependencies, building, configuring Pages, publishing, copying the link, updating later, and adding more chapters.</p>
      </div>
    </SectionShell>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-12 dark:border-white/10 dark:bg-[#071016]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-3 font-black"><span className="brand-mark"><Sigma size={20} /></span> MATHSFORGE</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Original static learning website for Class 12 Vector Algebra. Built with free frontend tools, local JSON content, SVG, KaTeX, and Three.js.
          </p>
        </div>
        <a href="#home" className="secondary-button">Back to top</a>
      </div>
    </footer>
  )
}

export default App
