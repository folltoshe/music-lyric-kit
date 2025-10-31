import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config, Params, Result } from '@root/writer/types'

import { DEFAULT_CONFIG } from '@root/writer/constants'

import { Writer } from '@music-lyric-kit/shared'

import { exportLines } from './line'
import { exportMeta } from './meta'

export class Plugin extends Writer.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Writer.Config.Full>) {
    super(DEFAULT_CONFIG, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override write(params: Params): Result {
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
