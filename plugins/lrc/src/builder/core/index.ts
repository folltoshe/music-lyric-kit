import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config, Params, Result } from '@root/builder/types'

import { DEFAULT_CONFIG } from '@root/builder/constants'

import { Builder } from '@music-lyric-kit/shared'

import { exportLines } from './line'
import { exportMeta } from './meta'

export class Plugin extends Builder.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Builder.Config.Full>) {
    super(DEFAULT_CONFIG, global)
    if (options) {
      this.updatePluginConfig(options)
    }
  }

  override build(params: Params): Result {
    const { original, dynamic, translate, roman } = exportLines(this.context, params)

    const meta = exportMeta(this.context, params)
    const target = [meta.join('\n'), '\n', '\n', original.join('\n')]

    return {
      original: target.join('').trim(),
      dynamic: dynamic.join('\n'),
      translate: translate.join('\n'),
      roman: roman.join('\n'),
    }
  }
}
