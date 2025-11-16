import type { ConfigManager, DeepPartial } from '@music-lyric-kit/shared'
import type { Config } from '@builder/config'
import type { Params, Result } from '@builder/core/types'

import { DEFAULT_CONFIG } from '@builder/config'

import { Builder } from '@music-lyric-kit/shared'

import { exportLines } from './line'
import { exportMeta } from './meta'

export class Plugin extends Builder.Plugin.Base<Config, Params, Result> {
  constructor(options?: DeepPartial<Config>, global?: ConfigManager<Builder.Config.Full>) {
    super(DEFAULT_CONFIG, options, global)
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

export type { Params, Result }
