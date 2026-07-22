/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        harpia: {
          bg: '#ffffff',      // Fundo principal branco
          card: '#f4f6f5',    // Cards cinza-esverdeados muito suaves
          gold: '#b28723',    // Dourado com contraste ainda maior sobre branco
          light: '#0f172a',   // Texto principal slate-900 (contraste máximo)
          muted: '#334155',   // Texto secundário slate-700 (contraste excelente)
          green: '#0e4e2d',   // Verde mais escuro para botões/destaques
          dark: '#05140d'     // Verde quase preto para títulos destacados
        }
      },
      fontFamily: {
        inter: ['Nunito', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
