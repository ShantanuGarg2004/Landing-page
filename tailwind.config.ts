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
        primary: '#FF9933',
        secondary: '#138808',
        background: '#F9F9F9',
        foreground: '#333333',
        card: '#FFFFFF',
        muted: '#E8E8E8',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
