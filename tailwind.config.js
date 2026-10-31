/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F2EC',
          300: '#EEEAE1', // Main Theme Color #EEEAE1
          400: '#E2DDD2',
          500: '#D5CFC2',
          600: '#B8B0A0',
          700: '#958C7B',
          800: '#6C6556',
          900: '#474237',
        },
        steelBlue: {
          50: '#F0F4F8',
          100: '#DEE6ED',
          200: '#BDCDDC',
          300: '#9CB3CB',
          400: '#849EBA',
          500: '#6D86A1', // Theme Accent Combo #6D86A1
          600: '#5C748D',
          700: '#4D6277',
          800: '#3E5062',
          900: '#2E3D4C',
          950: '#1D2732',
        },
        forestTeal: {
          500: '#6D86A1',
          800: '#4D6277',
          900: '#3E5062',
        },
        teal: {
          500: '#6D86A1',
          700: '#4D6277',
          800: '#3E5062',
        },
        coral: {
          400: '#6D86A1',
          500: '#5C748D',
        },
        slateNavy: {
          800: '#3E5062',
          900: '#2E3D4C',
        },
        brand: {
          linen: '#EEEAE1',
          teal: '#6D86A1',
          dark: '#3E5062',
          hover: '#5C748D',
          light: '#FAF8F5',
          coral: '#6D86A1',
          navy: '#3E5062',
          blue: '#6D86A1',
        },
        primary: {
          DEFAULT: '#6D86A1',
          hover: '#5C748D',
          light: '#F0F4F8',
          dark: '#3E5062',
        },
        secondary: {
          DEFAULT: '#EEEAE1',
          hover: '#E2DDD2',
          light: '#FAF8F5',
          dark: '#D5CFC2',
        },
        surface: {
          bg: '#EEEAE1', // Background Linen #EEEAE1
          card: '#FFFFFF', // Cards White
          subtle: '#FAF8F5',
          border: '#DDD7CA',
          hover: '#E8E3D8',
        },
        content: {
          main: '#1E293B', // Deep Slate
          secondary: '#475569', // Muted Slate
          muted: '#8595A6',
        },
        status: {
          success: '#2E7D5B', // Emerald
          warning: '#B87A14', // Amber
          danger: '#C53B3B', // Crimson
          info: '#6D86A1', // Theme Steel Blue
        }
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 71, 65, 0.05), 0 1px 2px 0 rgba(0, 71, 65, 0.03)',
        'card-hover': '0 6px 12px -2px rgba(0, 71, 65, 0.08), 0 3px 6px -2px rgba(0, 71, 65, 0.05)',
        'teal': '0 4px 14px 0 rgba(0, 71, 65, 0.25)',
      }
    },
  },
  plugins: [],
}
