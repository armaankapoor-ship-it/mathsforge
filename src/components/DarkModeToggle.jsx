import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      className="icon-button"
      onClick={onToggle}
      aria-label={dark ? 'Use light mode' : 'Use dark mode'}
      title={dark ? 'Use light mode' : 'Use dark mode'}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
