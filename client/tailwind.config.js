/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivyNavy: '#0B132B',       // Rich Ink Navy (Text/Primary Elements)
        ivyGold: '#D4AF37',       // Metallic Gold (Badges/Accents)
        ivyBlue: '#2563EB',       // Royal Blue (Interactive/Buttons)
        ivyGreen: '#16A34A',      // Forest Green (Success/Validated Tickets)
        ivyRed: '#DC2626',        // Crimson Red (Sold Out/Deadlines)
        ivySlate: '#64748B',      // Slate Gray (Secondary Text)
        ivyCard: '#F8FAFC',       // Off-White card fills
        ivyBg: '#FAF6EE',         // Creamy parchment background matching your designs
      },
    },
  },
  plugins: [],
}