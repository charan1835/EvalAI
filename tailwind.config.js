/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '68': '17rem',
      },
      colors: {
        bg: '#08101e',
        card: '#101929',
        card2: '#16233a',
        accent: '#6366f1',
        'accent-light': '#818cf8',
        'indigo-800': '#3730a3',
        'indigo-900': '#1e1b4b',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'spin-slow': 'spin 0.65s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
