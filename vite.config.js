import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),

  ],
  variants: {
    extend: {
      transform: ['group-hover'],
      translate: ['group-hover']
    }
  }
})