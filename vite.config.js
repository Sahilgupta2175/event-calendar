import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = env.PORT ? parseInt(env.PORT) : 4173
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'event-calendar-qs8d.onrender.com',
        '.onrender.com'
      ]
    },
    preview: {
      host: '0.0.0.0',
      port: port,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'event-calendar-qs8d.onrender.com',
        '.onrender.com'
      ]
    }
  }
})
