import type { Context, MatchInfo, MatchItem } from '@root/parser/types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'
import { parseTagTime, sortLines } from '@root/parser/utils'
import { checkIsValid, processTextToWords } from './utils'

const DYNAMIC_TIME_AND_CONTENT = /(<[^>]+>)([^<]*)/gu
const DYNAMIC_TIME_TAG_2 = /<([0-9]+),([0-9]+)\>/

const processDynamicLine = (options: Parser.Config.Line, line: MatchItem) => {
  const words: Lyric.Line.Word[] = []

  const lineTime = parseTagTime(line.tag)
  if (lineTime === null) return

  for (const wordInfo of line.content.matchAll(DYNAMIC_TIME_AND_CONTENT)) {
    const wordLast = words[words.length - 1]
    const wordTimeTag = wordInfo[1] || ''

    let wordTime = parseTagTime(wordTimeTag)
    let wordDuration = 0

    if (wordTime !== null) {
      wordDuration = wordLast?.time.start - wordTime
    } else {
      const timeMatchs = wordTimeTag.match(DYNAMIC_TIME_TAG_2)
      if (timeMatchs) {
        wordTime = lineTime + (parseInt(timeMatchs[1]) || 0)
        wordDuration = parseInt(timeMatchs[2]) || 0
      }
    }

    if (wordTime === null) continue

    const wordContent = wordInfo[2] || ''
    if (!wordContent) continue

    const wordResult = cloneDeep(Lyric.EMPTY_WORD_ITEM)
    wordResult.time = {
      start: wordTime,
      end: wordTime + wordDuration,
      duration: wordDuration,
    }
    wordResult.content = {
      original: wordContent,
    }

    if (wordDuration > options.prolongedSound.checkTime) {
      wordResult.config.isProlongedSound = true
    }

    words.push(wordResult)
  }

  const start = words[0]?.time.start ?? lineTime
  const duration = words.map((v) => v.time.duration).reduce((a, b) => a + b, 0)

  const time: Lyric.Time = {
    start,
    end: start + duration,
    duration,
  }

  const target: Lyric.Line.Info = cloneDeep(Lyric.EMPTY_LINE_INFO)
  const original = words.map((item) => `${item.content.original}${item.config.needSpaceEnd ? ' ' : ''}`).join('')

  target.time = time
  target.content = {
    words,
    original,
  }

  return target
}

const processDynamic = (options: Parser.Config.Line, matched: MatchItem[]) => {
  if (matched.length <= 0) return null

  const result: Lyric.Line.Info[] = []
  for (const line of matched) {
    const item = processDynamicLine(options, line)
    if (!item) continue
    result.push(item)
  }

  return result
}

const processNormalLine = (config: Parser.Config.Line, line: MatchItem) => {
  const time = parseTagTime(line.tag) || 0
  const text = line.content.trim()

  const result: Lyric.Line.Info = cloneDeep(Lyric.EMPTY_LINE_INFO)
  result.time.start = time
  result.content = {
    words: processTextToWords(text),
    original: text,
  }

  return result
}

const processNormal = (config: Parser.Config.Line, lines: MatchItem[]) => {
  if (lines.length <= 0) return null

  const result: Lyric.Line.Info[] = []
  for (const line of lines) {
    const item = processNormalLine(config, line)
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

interface Params {
  original: MatchInfo
  dynamic: MatchInfo
}

const processLines = (config: Parser.Config.Line, params: Params): [Lyric.Line.Info[] | null, boolean] => {
  const dynamic = processDynamic(config, params.dynamic.line)
  if (dynamic && checkIsValid(dynamic)) {
    return [dynamic, true]
  }

  const original = processNormal(config, params.original.line)
  if (original && checkIsValid(original)) {
    return [original, false]
  }

  return [null, false]
}

export const processMainLyric = (context: Context, params: Params) => {
  const config = context.common.config.get('line.main', 'line.common')!

  const [lines, isDynamic] = processLines(config, params)
  if (!lines) {
    return null
  }

  const result = cloneDeep(Lyric.EMPTY_INFO)
  result.config.isDynamic = isDynamic

  const isSupportAutoScroll = !!lines.find((line) => line.time.start > 0)
  result.config.isSupportAutoScroll = isSupportAutoScroll

  const isInstrumental = lines.length <= 0
  result.config.isInstrumental = isInstrumental

  // if no time tag, skip align extended lyric
  if (!isSupportAutoScroll) {
    result.lines = lines
    return result
  }

  result.lines = sortLines(lines)
  return result
}
