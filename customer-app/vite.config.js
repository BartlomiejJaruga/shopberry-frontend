import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7680,
  },
  alias: {
    '@enums': '/src/constants/enums.js',
    '@components': '/src/components'
  }
})
