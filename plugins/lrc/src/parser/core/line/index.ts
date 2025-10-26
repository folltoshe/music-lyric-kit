import type { LyricInfo, Line, Extended } from '@music-lyric-kit/shared'
import type { Context, MatchInfo } from '@root/parser/types'

import { EMPTY_LYRIC_INFO } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'
import { alignLyricWithTime, sortLines } from '@root/parser/utils'

import { processDynamic } from './dynamic'
import { processOriginal, processExtended } from './normal'

const checkIsValid = (lines: Line.Info[]) => {
  return lines.length > 0
}

interface MainParams {
  original: MatchInfo
  dynamic: MatchInfo
}

export const processMainLyric = (context: Context, params: MainParams) => {
  const original = processOriginal(context, params.original.line)
  if (!original || !checkIsValid(original)) {
    return null
  }

  const dynamic = processDynamic(context, params.dynamic.line)

  const target = dynamic && checkIsValid(dynamic) ? dynamic : original
  const result: LyricInfo = cloneDeep(EMPTY_LYRIC_INFO)

  const isSupportAutoScroll = !!target.find((line) => line.time.start > 0)
  result.config.isSupportAutoScroll = isSupportAutoScroll

  const isInstrumental = target.length <= 0
  result.config.isInstrumental = isInstrumental

  // if no time tag, skip align extended lyric
  if (!isSupportAutoScroll) {
    result.lines = target
    return result
  }

  result.lines = sortLines(target)
  return result
}

interface ExtendedParams {
  translate: MatchInfo
  roman: MatchInfo
}

export const processExtendedLyric = (context: Context, info: LyricInfo, params: ExtendedParams) => {
  if (!info.config.isSupportAutoScroll) {
    return info
  }

  const result = info
  const target = info.lines

  const translate = processExtended(context, 'translate', params.translate.line)
  const translateAlign =
    translate && checkIsValid(translate)
      ? alignLyricWithTime({
          base: target,
          target: translate,
        })
      : null

  const roman = processExtended(context, 'roman', params.roman.line)
  const romanAlign =
    roman && checkIsValid(roman)
      ? alignLyricWithTime({
          base: target,
          target: roman,
        })
      : null

  for (const line of target) {
    const result: Extended.Info[] = []
    if (translateAlign) {
      const target = translateAlign.find((v) => v.time.start === line.time.start) as Line.Info
      if (target) {
        result.push({
          type: 'TRANSLATE',
          content: target.content.original,
        })
      }
    }
    if (romanAlign) {
      const target = romanAlign.find((v) => v.time.start === line.time.start) as Line.Info
      if (target) {
        result.push({
          type: 'ROMAN',
          content: target.content.original,
        })
      }
    }
    line.content.extended = result
  }

  result.lines = target
  return result
}
