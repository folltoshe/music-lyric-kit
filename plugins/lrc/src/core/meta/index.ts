import type { LyricInfo } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/types'

import { processProducer } from '@music-lyric-kit/shared'
import { processTag } from './tag'

export const processMeta = (context: Context, metas: MatchItem[], lyric: LyricInfo) => {
  const [lines, producer] = processProducer(context, lyric.lines)

  const meta = processTag(context, metas)
  meta.producer = producer

  const result = lyric
  result.lines = lines
  result.meta = meta

  return result
}
