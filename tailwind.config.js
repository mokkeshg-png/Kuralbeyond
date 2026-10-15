/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF9F5',
          dark: '#F5EFE6',
        },
        ink: {
          DEFAULT: '#1A1A2E',
          muted: '#4A4A68',
          light: '#7A7A98',
        },
        teal: {
          DEFAULT: '#0F4C5C',
          light: '#1A6B80',
          dark: '#082D37',
          surface: '#E6F0F2',
        },
        maroon: {
          DEFAULT: '#7B2D26',
          light: '#A03D34',
          dark: '#521D18',
          surface: '#F9ECEB',
        },
        gold: {
          DEFAULT: '#E8B84B',
          light: '#F3D285',
          dark: '#B88B24',
          surface: '#FDF7EB',
        },
        leaf: {
          DEFAULT: '#4A7C59',
          light: '#65A378',
          dark: '#31543C',
          surface: '#EEF5F0',
        },
        sand: {
          DEFAULT: '#E8DCC8',
          light: '#F5EFE4',
          dark: '#D4C3A6',
        },
        sky: {
          DEFAULT: '#8ECAE6',
          light: '#BDE3F3',
          dark: '#4B9DC4',
          surface: '#F0F8FC',
        },
      },
      fontFamily: {
        heading: ['"Noto Serif Tamil"', 'Lora', 'Georgia', 'serif'],
        body: ['Inter', '"Noto Sans"', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'Latha', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'tile': '0 6px 0 0 rgba(0,0,0,0.12)',
        'tile-pressed': '0 2px 0 0 rgba(0,0,0,0.12)',
        'card-elevated': '0 10px 25px -5px rgba(26, 26, 46, 0.08), 0 8px 10px -6px rgba(26, 26, 46, 0.04)',
        'glow-gold': '0 0 20px rgba(232, 184, 75, 0.35)',
        'glow-teal': '0 0 20px rgba(15, 76, 92, 0.25)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.75rem',
      },
      lineHeight: {
        'tamil': '1.85',
      },
      keyframes: {
        'pop': {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'pop': 'pop 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'gentle-float 3s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
