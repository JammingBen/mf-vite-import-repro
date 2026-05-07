import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

// Mirrors the extension-sdk setup
const sharedModules = ['vue', 'vue3-gettext']

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote',
      exposes: { '.': './src/index.ts' },
      filename: 'remoteEntry.mjs',
      shared: Object.fromEntries(
        sharedModules.map((pkg) => [pkg, { singleton: true, import: false }])
      ),
      manifest: false,
      dts: false
    })
  ],
  server: {
    port: 5174,
    cors: true
  },
  build: {
    rollupOptions: {
      input: {
        remote: './src/index.ts'
      }
    }
  }
})
