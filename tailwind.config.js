/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FFF5F2',
          100: '#FFEAE3',
          200: '#FFD4C5',
          300: '#FFBCA6',
          400: '#FFA586', // Main Theme Color #FFA586
          500: '#F58B68',
          600: '#E5734E',
          700: '#C95733',
          800: '#A74223',
          900: '#87341B',
        },
        slateNavy: {
          50: '#F2F5F9',
          100: '#E6EBF3',
          200: '#C9D3E4',
          300: '#A4B2CD',
          400: '#8091B3',
          500: '#67789A',
          600: '#556482',
          700: '#46536C',
          800: '#384358', // Main Theme Color #384358
          900: '#2A3343',
          950: '#1E2532',
        },
        navy: {
          950: '#1E2532',
          900: '#2A3343',
          800: '#384358', // Main Theme Color #384358
          700: '#46536C',
          600: '#556482',
        },
        brand: {
          coral: '#FFA586',
          navy: '#384358',
          hover: '#F58B68',
          light: '#FFF5F2',
          blue: '#FFA586', // legacy fallback mapped to coral
        },
        primary: {
          DEFAULT: '#FFA586',
          hover: '#F58B68',
          light: '#FFF5F2',
          dark: '#E5734E',
        },
        secondary: {
          DEFAULT: '#384358',
          hover: '#2A3343',
          light: '#F2F5F9',
          dark: '#1E2532',
        },
        surface: {
          bg: '#F5F7FA', // Background Light Grey
          card: '#FFFFFF', // Cards White
          border: '#E2E8F0',
          hover: '#F1F5F9',
        },
        content: {
          main: '#202939', // Main Text Dark Charcoal
          secondary: '#667085', // Secondary Text Grey
          muted: '#94A3B8',
        },
        status: {
          success: '#198754', // Muted Green
          warning: '#D99A22', // Amber
          danger: '#DC5454', // Muted Red
          info: '#FFA586', // Theme Coral
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px 0 rgba(16, 24, 40, 0.02)',
        'card-hover': '0 4px 6px -1px rgba(16, 24, 40, 0.08), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        'coral': '0 4px 14px 0 rgba(255, 165, 134, 0.35)',
      }
    },
  },
  plugins: [],
}
