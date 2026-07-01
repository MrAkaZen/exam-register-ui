/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          light:   'var(--accent-light)',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        card:  'var(--shadow-card)',
        glow:  'var(--shadow-glow)',
      },
      animation: {
        'fade-up':  'fadeUp .45s cubic-bezier(.22,1,.36,1) both',
        'fade-in':  'fadeIn .35s ease both',
        'count-up': 'countUp .5s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
};
