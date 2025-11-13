import type { Context, MatchInfo, MatchItem } from '@parser/core//types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'
import { alignLyricWithTime, parseTagTime, checkLineIsValid } from '@parser/utils'

const processLine = (config: Parser.Config.Line, line: MatchItem) => {
  const time = parseTagTime(line.tag) || 0
  const text = line.content.trim()

  const result: Lyric.Line.Info = cloneDeep(Lyric.EMPTY_LINE_INFO)
  result.time.start = time
  result.content.original = text

  return result
}

const processNormal = (config: Parser.Config.Line, lines: MatchItem[]) => {
  if (lines.length <= 0) return null

  const result: Lyric.Line.Info[] = []
  for (const line of lines) {
    const item = processLine(config, line)
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

const processItem = (context: Context, key: keyof Parser.Config.FullRequired['line']['extended'], lines: MatchItem[]) => {
  const options = context.common.config.get(`line.extended.${key}`, 'line.common')!
  return processNormal(options, lines)
}

interface Params {
  translate: MatchInfo
  roman: MatchInfo
}

export const processExtendedLyric = (context: Context, info: Lyric.Info, params: Params) => {
  if (!info.config.isSupportAutoScroll) {
    return info
  }

  const result = info
  const target = info.lines

  const translate = processItem(context, 'translate', params.translate.line)
  const translateAlign =
    translate && checkLineIsValid(translate)
      ? alignLyricWithTime({
          base: target,
          target: translate,
        })
      : null

  const roman = processItem(context, 'roman', params.roman.line)
  const romanAlign =
    roman && checkLineIsValid(roman)
      ? alignLyricWithTime({
          base: target,
          target: roman,
        })
      : null

  for (const line of target) {
    const result: Lyric.Line.Extended.Info[] = []
    if (translateAlign) {
      const target = translateAlign.find((v) => v.time.start === line.time.start) as Lyric.Line.Info
      if (target) {
        result.push({
          type: Lyric.EXTENDED_TYPES.TRANSLATE,
          content: target.content.original,
        })
      }
    }
    if (romanAlign) {
      const target = romanAlign.find((v) => v.time.start === line.time.start) as Lyric.Line.Info
      if (target) {
        result.push({
          type: Lyric.EXTENDED_TYPES.ROMAN,
          content: target.content.original,
        })
      }
    }
    line.content.extended = result
  }

  result.lines = target
  return result
}
