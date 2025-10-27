import type { ConfigManager, CommonParserOptions } from '@music-lyric-kit/shared'
import type { LrcParserOptions, LrcParserParams } from '@root/parser/types'

import { DEFAULT_PARSER_OPTIONS } from '@root/parser/constants/options'

import { BaseParserPlugin } from '@music-lyric-kit/shared'

import { matchLyric } from './match'
import { processMeta } from './meta'
import { processMainLyric, processExtendedLyric } from './line'
import { purificationLyric, insertDuet, insertInterlude } from '@music-lyric-kit/shared'

import { sortLines } from '@root/parser/utils'

export class LrcParser extends BaseParserPlugin<LrcParserOptions, LrcParserParams> {
  constructor(options?: LrcParserOptions, global?: ConfigManager<CommonParserOptions>) {
    super(DEFAULT_PARSER_OPTIONS, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override parse(params: LrcParserParams) {
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
