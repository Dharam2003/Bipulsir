/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bipulsir Brand Colors
        primary: {
          50: '#e8f4fd',
          100: '#c7e4f9',
          200: '#94cbf5',
          300: '#5aa8ee',
          400: '#2d7ee4',
          500: '#1e5bcf',
          600: '#1a4db8',
          700: '#1a408f',
          800: '#1c3975',
          900: '#1c3062',
          950: '#151e3c',
        },
        accent: {
          50: '#e6fffa',
          100: '#b3fff0',
          200: '#66ffe0',
          300: '#1affd1',
          400: '#00e6c3',
          500: '#00bfa5',
          600: '#009688',
          700: '#00786b',
          800: '#005a52',
          900: '#004940',
          950: '#002e29',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(30, 91, 207, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(30, 91, 207, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #1e5bcf 0%, #00bfa5 25%, #1a408f 50%, #009688 75%, #151e3c 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};