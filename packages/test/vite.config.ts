import { join } from 'node:path'

import { generateConfig } from '../../vite.config'

const src = join(process.cwd(), 'src')

export default generateConfig({
  root: src,
  build: {
    minify: false,
    reportCompressedSize: false,
  },
  server: {
    port: 9090,
    strictPort: false,
  },
})
