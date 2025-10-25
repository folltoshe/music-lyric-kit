import type { LyricInfo, MusicInfoProps } from '@music-lyric-kit/shared'
import type { LrcOptionsRequired, LrcParseProps } from '@root/types'

import { DEFAULT_OPTIONS } from '@root/constants/options'

import { BasePlugin } from '@music-lyric-kit/shared'
import { sortLines } from '@root/utils'

import { matchLyric } from './match'
import { processMeta } from './meta'
import { processMainLyric, processExtendedLyric } from './line'
import { purificationLyric, insertDuet, insertInterlude } from '@music-lyric-kit/shared'

export class LrcParser extends BasePlugin<LrcOptionsRequired, LrcParseProps> {
  constructor() {
    super(DEFAULT_OPTIONS)
  }

  override parse(props: LrcParseProps, musicInfo?: MusicInfoProps): LyricInfo | null {
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

  override export(info: LyricInfo): string {
    return ''
  }
}
