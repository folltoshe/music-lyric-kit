import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config, Params, Result } from '@root/parser/types'

import { DEFAULT_CONFIG } from '@root/parser/constants'

import { Parser } from '@music-lyric-kit/shared'

import { sortLines } from '@root/parser/utils'
import { matchLyric } from './match'
import { processMeta } from './meta'
import { processMainLyric, processExtendedLyric } from './line'

const { purificationLyric, insertInterlude, insertDuet } = Parser.Processor

export class Plugin extends Parser.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Parser.Config.Full>) {
    super(DEFAULT_CONFIG, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override parse(params: Params): Result {
    const [original, dynamic, translate, roman] = [
      matchLyric(params.content.original),
      matchLyric(params.content.dynamic),
      matchLyric(params.content.translate),
      matchLyric(params.content.roman),
    ]

    let target = processMainLyric(this.context, { original, dynamic })
    if (!target) {
      return null
    }

    // meta
    target = processMeta(this.context, original.meta, target)

    // purification
    target = purificationLyric(this.context, target, params.musicInfo)

    // duet
    target = insertDuet(this.context, target)

    // process extended
    target = processExtendedLyric(this.context, target, { translate, roman })

    // interlude
    target = insertInterlude(this.context, target)

    // sort lines
    target.lines = sortLines(target.lines)

    return target
  }
}
