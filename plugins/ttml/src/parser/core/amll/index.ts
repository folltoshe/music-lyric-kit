import type { Context } from '@parser/core/types'
import type { Lyric } from '@music-lyric-kit/shared'

import { processLyric } from './main'
import { processMeta } from './meta'

export const processAmllFormat = (context: Context, head: any, body: any): Lyric.Info | null => {
  let target = processLyric(context, body)
  if (!target) {
    return null
  }

  // amll meta
  target = processMeta(context, target, head)

  return target
}
