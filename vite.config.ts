import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    // Split the large React vendor bundle out of the app entry chunk so the
    // initial download stays small and the vendor chunk caches long-term.
    rollupOptions: {
      output: {
        // Split vendor code out of the app entry chunk so the initial
        // download stays small and vendor chunks cache long-term.
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/node_modules\/(react|react-dom|react-router-dom|scheduler)\//.test(id)) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
