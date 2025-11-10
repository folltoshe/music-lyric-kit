import { generateConfig } from '../../vite.config'

import PluginDts from 'vite-plugin-dts'

export default generateConfig({
  plugins: [PluginDts({ rollupTypes: true })],
})
