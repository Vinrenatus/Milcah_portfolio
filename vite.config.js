import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 still ships @import-based partials; silence the Sass
        // deprecation noise they generate so real warnings stay visible.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
        quietDeps: true,
        api: 'modern-compiler',
      },
    },
  },
})
