import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF6EC',  //50: '#FFF3EC',
          100: '#DBEAFE', //100: '#FFE9DD',
          200: '#BFDBFE', //200: '#FFD0B3'
          300: '#93C5FD', //300: '#FFAD7A',
          400: '#60A5FA', //400: '#FF7F42',
          500: '#2563EB', //500: '#FF5A1F',
          600: '#1D4ED8', //600: '#E24913',
          700: '#1E40AF', //700: '#C23D0C',
          800: '#1E3A8A', //800: '#9C330D',
          900: '#172554', //900: '#7E2C0F',
        },
        ink: {
          DEFAULT: '#111827',  // DEFAULT: '#17130F',
          soft: '#423A34',
        },
        gray: {
          warm: '#6F675F',
          light: '#A79E95',
        },
        bg: {
          DEFAULT: '#FFFDFB',
          alt: '#FBF4EE',
        },
        border: '#EFE6DC',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(23, 19, 15, 0.06)',
        card: '0 8px 24px rgba(23, 19, 15, 0.08)',
        glow: '0 20px 48px rgba(226, 73, 19, 0.16)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        marquee: {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '100%': {
      transform: 'translate3d(-50%, 0, 0)',
    },
  },

  'marquee-reverse': {
    '0%': {
      transform: 'translate3d(-50%, 0, 0)',
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-1.5deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-24px, 24px) scale(0.94)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ping-slow': {
          '75%, 100%': { transform: 'scale(1.9)', opacity: 0 },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 36s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'float-delayed': 'float-delayed 7.5s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
