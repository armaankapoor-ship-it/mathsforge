import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { MathLine } from './Math'

export function SectionShell({ id, eyebrow, title, description, children, tint = false }) {
  return (
    <section id={id} className={`section-shell scroll-mt-24 ${tint ? 'section-tint' : ''}`}>
      <div className="page-wrap">
        <div className="max-w-4xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        <div className="mt-9">{children}</div>
      </div>
    </section>
  )
}

export function MetricCard({ label, value, detail, Icon }) {
  return (
    <article className="metric-card">
      {Icon && <Icon size={22} />}
      <strong>{value}</strong>
      <span>{label}</span>
      {detail && <p>{detail}</p>}
    </article>
  )
}

export function FormulaCard({ formula }) {
  return (
    <article className="formula-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="micro-label">Formula</p>
          <h3>{formula.title}</h3>
        </div>
        <CheckCircle2 size={20} className="text-axis dark:text-mint" />
      </div>
      <div className="formula-strip">
        <MathLine block>{formula.latex}</MathLine>
      </div>
      <p>{formula.meaning}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MiniFact title="Geometry" text={formula.geometry} />
        <MiniFact title="Trap" text={formula.trap} warm />
      </div>
    </article>
  )
}

export function MiniFact({ title, text, warm = false }) {
  return (
    <div className={`mini-fact ${warm ? 'warm' : ''}`}>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  )
}

export function Pill({ children }) {
  return <span className="pill">{children}</span>
}

export function ActionLink({ href, children }) {
  return (
    <a className="primary-button" href={href}>
      {children}
      <ArrowRight size={16} />
    </a>
  )
}
