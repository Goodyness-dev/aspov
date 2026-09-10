/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mist: {
          50: '#e8f2f8',
          100: '#d0e4f0',
          200: '#a8cce3',
          300: '#7bb3d4',
          400: '#4e95bf',
          500: '#2e78a8',
          600: '#1d5f8c',
          700: '#164a70',
          800: '#123a59',
          900: '#0d2c45',
          950: '#081c2e',
        },
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3daec',
          300: '#94bfe0',
          400: '#5e9ed0',
          500: '#3880be',
          600: '#2766a2',
          700: '#1f4f81',
          800: '#1c436b',
          900: '#142f4c',
          950: '#0c1b2c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
