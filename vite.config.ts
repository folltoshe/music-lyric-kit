import type { UserConfig } from 'vite'

import { join } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'

const root = join(process.cwd())
const src = join(root, 'src')

const external = ['lodash-es', '@music-lyric-kit']

const common = defineConfig({
  root,
  build: {
    lib: {
      entry: join(src, 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external(source, importer, isResolved) {
        for (const name of external) {
          if (source.includes(name)) {
            return true
          }
        }
        return false
      },
    },
    outDir: join(root, 'dist'),
    minify: 'esbuild',
    reportCompressedSize: false,
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@root': src,
    },
  },
})

export const generateConfig = (config: UserConfig, mergeDefault: boolean = true) => {
  return mergeDefault ? mergeConfig(common, config) : config
}
