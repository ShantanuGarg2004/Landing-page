import type { Config } from 'tailwindcss'

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
        heading: 'var(--font-poppins)',
      },
      colors: {
        primary: '#DC2626',
        secondary: '#2563EB',
        background: '#FAFAF8',
        foreground: '#1a1a1a',
        card: '#FFFFFF',
        muted: '#E8E8E8',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
