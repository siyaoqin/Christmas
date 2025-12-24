import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Christmas/',   // ⭐ 仓库名，大小写必须一致
  plugins: [react()],
})

