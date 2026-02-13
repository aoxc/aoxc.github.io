import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// ESM modüllerde __dirname kullanımı yerine bunu kullanmak daha güvenlidir
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Ortam değişkenlerini yükle
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // aoxc.github.io için base '/' olmalıdır
    base: '/',
    
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    // Environment variables için tanımlamalar
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    
    resolve: {
      alias: {
        // '@' işaretini kök dizine veya 'src' dizinine yönlendirebilirsiniz
        '@': path.resolve(__dirname, './src'), 
      }
    },

    build: {
      // Çıktı klasörünün dist olduğundan emin olalım
      outDir: 'dist',
      // Küçük dosyaları base64 yapmak yerine ayrı tutmak performansı artırabilir
      assetsInlineLimit: 4096,
    }
  };
});
