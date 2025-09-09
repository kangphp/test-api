import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sprintpedia.id',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/page'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<!DOCTYPE html><html><body><div class="error">Gagal mengambil data profil</div></body></html>');
          });
        }
      }
    }
  }
})
