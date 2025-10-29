import type { Lyric } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/parser/types'

import { Parser } from '@music-lyric-kit/shared'

import { processTag } from './tag'

const { processProducer } = Parser.Processor

export const processMeta = (context: Context, metas: MatchItem[], lyric: Lyric.Info) => {
  const [lines, producer] = processProducer(context, lyric.lines)

  const meta = processTag(context, metas)
  meta.producer = producer

  const result = lyric
  result.lines = lines
  result.meta = meta

  return result
}
