import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths allow the same build to work at / and /repository-name/.
  base: './',
  plugins: [react(), tailwindcss()],
})