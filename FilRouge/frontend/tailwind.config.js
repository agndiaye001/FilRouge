/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        secondary: '#22C55E', 
        secondaryHover: '#16A34A', 
        accent: '#F97316', 
        accentHover: '#EA580C',
        background: '#F9FAFB', 
        text: '#111827', 
        textMuted: '#6B7280', 
      },
    },
  },
  plugins: [],
}

