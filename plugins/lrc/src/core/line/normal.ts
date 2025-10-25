import type { Line, CommonLineOptions, CommonOptionsRequired } from '@music-lyric-kit/shared'
import type { DeepRequired } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/types'

import { EMPTY_LINE_ITEM } from '@music-lyric-kit/shared'

import { cloneDeep, insertSpace } from '@music-lyric-kit/shared'
import { parseTagTime } from '@root/utils'

const processLine = (options: DeepRequired<CommonLineOptions>, line: MatchItem) => {
  const time = parseTagTime(line.tag) || 0
  const text = options.insert.space.enable ? insertSpace(line.content, options.insert.space.types).trim() : line.content.trim()

  const result: Line.Info = cloneDeep(EMPTY_LINE_ITEM)
  result.time.start = time
  result.content.original = text

  return result
}

const processNormal = (options: DeepRequired<CommonLineOptions>, lines: MatchItem[]) => {
  if (lines.length <= 0) return null

  const result: Line.Info[] = []
  for (const line of lines) {
    const item = processLine(options, line)
    if (!item) continue
    result.push(item)
  }

  for (let index = 0; index < result.length; index++) {
    const current = result[index]
    const next = result[index + 1]
    if (!next) continue
    const currentDuration = next.time.start - current.time.start
    current.time.duration = currentDuration
    current.time.end = next.time.start
  }

  return result
}

export const processOriginal = (context: Context, lines: MatchItem[]) => {
  const options = context.options.common.getByKey('content.normal.original')
  return processNormal(options, lines)
}

export const processExtended = (context: Context, key: keyof CommonOptionsRequired['content']['extended'], lines: MatchItem[]) => {
  const options = context.options.common.getByKey(`content.extended.${key}`)
  return processNormal(options, lines)
}
