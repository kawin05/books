import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        ring: 'var(--ring)',
        input: 'var(--input)',
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'rgba(240,235,224,0.06)',
        },
        bg: {
          DEFAULT: '#0E0F12',
          deep: '#08090B',
          raised: '#15171B',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          rust: '#C85D4E',
          amber: '#E8B85C',
          cream: '#F0EBE0',
        },
        text: {
          primary: '#F0EBE0',
          secondary: 'rgba(240,235,224,0.7)',
          muted: 'rgba(240,235,224,0.4)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale — see Septiembre's huge headlines
        'display-xl': ['clamp(4rem, 12vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [typography],
}

export default config
