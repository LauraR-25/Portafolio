/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F2',
          100: '#F4F0EA',
          200: '#EAE3D2',
          300: '#DBD0B8',
          400: '#C4B492',
          500: '#AC9A6F',
        },
        olive: {
          50: '#F4F5EC',
          100: '#E7EAD3',
          200: '#CFD6A8',
          300: '#AFBB7A',
          400: '#8CA052',
          500: '#6A8037',
          600: '#556B2F',
          700: '#4A5D2E',
          800: '#3B4A26',
          900: '#2C381D',
          950: '#1B2312',
        },
        brown: {
          50: '#F8F1EA',
          100: '#EFE0D2',
          200: '#DFC0A5',
          300: '#C9A178',
          400: '#AB7D55',
          500: '#8B5E3C',
          600: '#6F421F',
          700: '#5C381C',
          800: '#462B16',
          900: '#2F1C0E',
        },
        mustard: {
          50: '#FBF5EA',
          100: '#F6E9D1',
          200: '#EED3A4',
          300: '#E3B978',
          400: '#D4A373',
          500: '#C58B2B',
          600: '#A9731F',
          700: '#85591A',
          800: '#634115',
          900: '#422B0E',
        },
        night: {
          800: '#2A2440',
          900: '#1E1B2E',
          950: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(85, 107, 47, 0.15)',
        'card': '0 4px 20px rgba(111, 66, 31, 0.10)',
        'card-hover': '0 8px 30px rgba(197, 139, 43, 0.20)',
        'elevated': '0 10px 40px rgba(30, 27, 46, 0.18)',
        'mustard': '0 6px 18px rgba(197, 139, 43, 0.25)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
