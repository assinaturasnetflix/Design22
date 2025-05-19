/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que o App.jsx seja escaneado
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#00FFFF',
        'brand-purple': '#9933FF',
        'brand-lime': '#32CD32',
        'dark-bg': '#111827',
        'dark-card': '#1F2937',
        'dark-text': '#E5E7EB',
        'dark-text-secondary': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
