// Tailwind config. Note: package.json sets "type": "module", so this file is ESM.
//
// Colours come in two flavours:
//   * Fixed scales (primary, accent, dark) — identical in both themes.
//   * Semantic tokens (canvas, surface, heading, body, muted, veil, hairline) —
//     backed by CSS variables defined in src/index.css. Flipping the `dark` class
//     on <html> reassigns those variables, so every component re-themes at once
//     without needing a `dark:` variant on each utility.
//
// The `<alpha-value>` placeholder keeps opacity modifiers working on the
// semantic tokens too, e.g. `bg-veil/10` or `bg-canvas/80`.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0a0a0f',
        },
        canvas: token('--c-canvas'),
        surface: token('--c-surface'),
        elevated: token('--c-elevated'),
        heading: token('--c-heading'),
        body: token('--c-body'),
        muted: token('--c-muted'),
        subtle: token('--c-subtle'),
        // Neutral overlay that inverts per theme: light film on dark, dark film
        // on light. Replaces the hardcoded `white/10`-style washes.
        veil: token('--c-veil'),
        hairline: token('--c-hairline'),
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        'gradient-brand-soft':
          'linear-gradient(135deg, rgba(99,102,241,.16) 0%, rgba(139,92,246,.16) 50%, rgba(6,182,212,.16) 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
        'gradient-mesh':
          'radial-gradient(at 12% 18%, rgba(99,102,241,.28) 0px, transparent 55%),' +
          'radial-gradient(at 88% 8%, rgba(139,92,246,.24) 0px, transparent 52%),' +
          'radial-gradient(at 72% 82%, rgba(6,182,212,.22) 0px, transparent 50%),' +
          'radial-gradient(at 22% 92%, rgba(236,72,153,.18) 0px, transparent 48%)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.35)',
        'glow-lg': '0 0 60px rgba(99, 102, 241, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
