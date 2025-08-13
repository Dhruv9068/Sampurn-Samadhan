/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdf7',
          100: '#fffbf0',
          200: '#fff5d6',
          300: '#ffefbc',
          400: '#ffe899',
          500: '#ffd700',
          600: '#d4af37',
          700: '#b8941f',
          800: '#9c7a0d',
          900: '#6b5409',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4af37',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        beige: {
          50: '#fefefe',
          100: '#fdfcf9',
          200: '#faf8f3',
          300: '#f5f2ea',
          400: '#ede8d8',
          500: '#e0d8c0',
          600: '#c4b89a',
          700: '#a89c7a',
          800: '#8c7f5f',
          900: '#706344',
        },
        indianGreen: {
          500: '#138808',
          600: '#0f6b06',
        },
        indianBlue: {
          500: '#000080',
          600: '#000066',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'gentle-float': 'gentleFloat 6s ease-in-out infinite',
        'aura-pulse': 'auraPulse 4s ease-in-out infinite',
        'particle-drift': 'particleDrift 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(196, 184, 154, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(196, 184, 154, 0.6)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
                gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        auraPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        particleDrift: {
          '0%': { transform: 'translateX(-100px) translateY(100px)' },
          '100%': { transform: 'translateX(100vw) translateY(-100px)' },
        }
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
