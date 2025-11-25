import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    target: 'esnext',
    minify: false,
  },
});

