import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — build to ../dist so Vercel serves it from the repo root
// alongside the existing static HTML decks
export default defineConfig({
  plugins: [react()],
  build: {
    // Build to a 'build' directory at repo root.
    // Vercel's vercel.json points outputs there.
    outDir: '../build',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
