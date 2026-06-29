/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,json}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        graphite: '#253244',
        vector: '#145c70',
        axis: '#0f766e',
        flux: '#ea7a3a',
        sun: '#f5b942',
        skyglass: '#d9f1f7',
        mint: '#b9f6de',
      },
      boxShadow: {
        soft: '0 22px 70px rgba(15, 23, 42, .10)',
        line: '0 1px 0 rgba(15, 23, 42, .08)',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '.35' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseLine: 'pulseLine 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
