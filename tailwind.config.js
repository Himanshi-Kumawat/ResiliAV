/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          darkest: '#070C15',
          dark: '#0B1220',
          card: '#0E1726',
          cardHover: '#132035',
          border: '#1A2942',
          borderLight: '#24395C',
          cyan: '#00F0FF',
          teal: '#0D9488',
          emerald: '#10B981',
          danger: '#FF3366',
          warning: '#F59E0B',
          muted: '#8A99AD'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar': 'radar 2.5s ease-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
