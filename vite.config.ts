import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // GitHub Pages'te bazen './' (nokta bölü) kullanmak siyah ekranı çözer
    base: './', 
    
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    
    resolve: {
      alias: {
        // src olmadığı için '@' işaretini doğrudan ana dizine (root) bağladık
        '@': path.resolve(__dirname, '.'), 
      }
    },

    build: {
      outDir: 'dist',
      assetsInlineLimit: 4096,
      // Dosya isimlerinin başına bazen gereksiz '/' gelmesini engellemek için
      emptyOutDir: true,
    }
  };
});
