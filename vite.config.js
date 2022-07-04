import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const envPrefix = "ENV_";
  const env = loadEnv(mode, process.cwd(), envPrefix);
  // Deixando acessível as variáveis de ambientes por ReactJs.
  import.meta.env = env;

  return {
    plugins: [react()],
    envPrefix,
  }
});