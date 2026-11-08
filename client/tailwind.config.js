/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#173B65', // Primary brand color
          900: '#0F2744',
          950: '#0A1A2E',
        },
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // Secondary brand color
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        surface: {
          ground: '#F5F7FB', // Light Grey background
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        palette: {
          answered: '#10B981', // Green
          unanswered: '#EF4444', // Red
          review: '#8B5CF6', // Purple
          unvisited: '#94A3B8', // Grey
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 25px -5px rgba(23, 59, 101, 0.08), 0 8px 10px -6px rgba(23, 59, 101, 0.05)',
      }
    },
  },
  plugins: [],
}

