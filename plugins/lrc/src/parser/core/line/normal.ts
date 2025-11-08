import type { DeepRequired } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/parser/types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'
import { parseTagTime } from '@root/parser/utils'

const processLine = (options: DeepRequired<Parser.Config.Line>, line: MatchItem) => {
  const time = parseTagTime(line.tag) || 0
  const text = line.content.trim()

  const result: Lyric.Line.Info = cloneDeep(Lyric.EMPTY_LINE_INFO)
  result.time.start = time
  result.content.original = text

  return result
}

const processNormal = (options: DeepRequired<Parser.Config.Line>, lines: MatchItem[]) => {
  if (lines.length <= 0) return null

  const result: Lyric.Line.Info[] = []
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
  const options = context.common.config.get('line.original', 'line.common')!
  return processNormal(options, lines)
}

export const processExtended = (context: Context, key: keyof Parser.Config.FullRequired['line']['extended'], lines: MatchItem[]) => {
  const options = context.common.config.get(`line.extended.${key}`, 'line.common')!
  return processNormal(options, lines)
}
