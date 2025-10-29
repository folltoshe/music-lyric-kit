import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config, Params, Result } from '@root/exporter/types'

import { DEFAULT_CONFIG } from '@root/exporter/constants'

import { Lyric, Exporter } from '@music-lyric-kit/shared'

export class Plugin extends Exporter.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Exporter.Config.Full>) {
    super(DEFAULT_CONFIG, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override export(params: Params): Result {
    return null
  }
}
