import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const envPrefix = "ENV_";
  const env = loadEnv(mode, process.cwd(), envPrefix);

  return {
    plugins: [react()],
    envPrefix,
    define: { env }
  }
});