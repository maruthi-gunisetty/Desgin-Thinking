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
          200: '#F5F2EB',
          300: '#F0EDE4', // Main Theme Color #F0EDE4
          400: '#E4DFD3',
          500: '#D5CDBF',
          600: '#B8AD9C',
          700: '#958874',
          800: '#6C6253',
          900: '#474035',
        },
        forestTeal: {
          50: '#E6F2F1',
          100: '#CCE5E3',
          200: '#99CBC7',
          300: '#66B1AB',
          400: '#33978F',
          500: '#007D73',
          600: '#00665E',
          700: '#00544D',
          800: '#004741', // Theme Accent Combo #004741
          900: '#003530',
          950: '#002421',
        },
        teal: {
          50: '#E6F2F1',
          100: '#CCE5E3',
          200: '#99CBC7',
          300: '#66B1AB',
          400: '#33978F',
          500: '#007D73',
          600: '#00665E',
          700: '#00544D',
          800: '#004741',
          900: '#003530',
        },
        coral: {
          400: '#004741',
          500: '#003530',
        },
        slateNavy: {
          800: '#004741',
          900: '#003530',
        },
        brand: {
          linen: '#F0EDE4',
          teal: '#004741',
          dark: '#003530',
          hover: '#003833',
          light: '#FAF8F5',
          coral: '#004741',
          navy: '#004741',
          blue: '#004741',
        },
        primary: {
          DEFAULT: '#004741',
          hover: '#003530',
          light: '#E6F2F1',
          dark: '#002421',
        },
        secondary: {
          DEFAULT: '#F0EDE4',
          hover: '#E4DFD3',
          light: '#FAF8F5',
          dark: '#D5CDBF',
        },
        surface: {
          bg: '#F0EDE4', // Background Linen #F0EDE4
          card: '#FFFFFF', // Cards White
          subtle: '#FAF8F5',
          border: '#E4DFD3',
          hover: '#EBE7DC',
        },
        content: {
          main: '#192423', // Deep Forest Charcoal
          secondary: '#4D5E5C', // Muted Slate Forest
          muted: '#80918F',
        },
        status: {
          success: '#00665E', // Forest Green
          warning: '#B87A14', // Amber
          danger: '#C53B3B', // Crimson
          info: '#004741', // Theme Teal
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
