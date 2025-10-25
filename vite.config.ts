import type { UserConfig } from 'vite'

import { join } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'

const root = join(process.cwd())
const src = join(root, 'src')

const DefaultConfig = defineConfig({
  root,
  build: {
    outDir: join(root, 'dist'),
    lib: {
      entry: join(src, 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    minify: 'esbuild',
    reportCompressedSize: false,
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    external: [],
    alias: {
      '@root': src,
    },
  },
})

export const generateConfig = (config: UserConfig, mergeDefault: boolean = true) => {
  return mergeDefault ? mergeConfig(DefaultConfig, config) : config
}
