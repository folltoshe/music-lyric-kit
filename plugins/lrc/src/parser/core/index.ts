import type { ConfigManager, CommonParserOptions, MusicInfoProps } from '@music-lyric-kit/shared'
import type { LrcParserOptions, LrcParserProps, LrcParserResult } from '@root/parser/types'

import { DEFAULT_PARSER_OPTIONS } from '@root/parser/constants/options'

import { BaseParserPlugin } from '@music-lyric-kit/shared'

import { matchLyric } from './match'
import { processMeta } from './meta'
import { processMainLyric, processExtendedLyric } from './line'
import { purificationLyric, insertDuet, insertInterlude } from '@music-lyric-kit/shared'

import { sortLines } from '@root/parser/utils'

export class LrcParser extends BaseParserPlugin<LrcParserOptions, LrcParserProps, LrcParserResult> {
  constructor(options?: LrcParserOptions, global?: ConfigManager<CommonParserOptions>) {
    super(DEFAULT_PARSER_OPTIONS, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override parse(props: LrcParserProps, musicInfo?: MusicInfoProps): LrcParserResult {
    const [original, dynamic, translate, roman] = [
      matchLyric(props.original),
      matchLyric(props.dynamic),
      matchLyric(props.translate),
      matchLyric(props.roman),
    ]

    let target = processMainLyric(this.context, { original, dynamic })
    if (!target) {
      return null
    }

    // meta
    target = processMeta(this.context, original.meta, target)

    // purification
    target = purificationLyric(this.context, target, musicInfo)

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
