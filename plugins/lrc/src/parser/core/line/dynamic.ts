import type { TimeInfo, Line, Dynamic, CommonParserLineOptions } from '@music-lyric-kit/shared'
import type { DeepRequired } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/parser/types'

import { EMPTY_DYNAMIC_ITEM, EMPTY_LINE_ITEM } from '@music-lyric-kit/shared'

import { cloneDeep, insertSpace, checkFirstCharIsPunctuation, checkEndCharIsPunctuation } from '@music-lyric-kit/shared'
import { parseTagTime } from '@root/parser/utils'

const TIME_AND_CONTENT = /(?<time><[^>]+>)(?<content>[^<]*)/gu
const TIME_TAG_2 = /<(?<start>[0-9]+),(?<duration>[0-9]+)\>/

const SPACE_START = /^\s+/
const SPACE_END = /\s+$/

const processLine = (options: DeepRequired<CommonParserLineOptions>, line: MatchItem) => {
  const targetWords: Dynamic.WordItem[] = []

  const lineTime = parseTagTime(line.tag)
  if (lineTime === null) return

  for (const wordInfo of line.content.matchAll(TIME_AND_CONTENT)) {
    const wordLast = targetWords[targetWords.length - 1]
    const wordTimeTag = wordInfo.groups?.time || ''

    let wordTime = parseTagTime(wordTimeTag)
    let wordDuration = 0

    if (wordTime !== null) {
      wordDuration = wordLast?.time.start - wordTime
    } else {
      const timeMatchs = wordTimeTag.match(TIME_TAG_2)
      if (timeMatchs?.groups) {
        wordTime = lineTime + (parseInt(timeMatchs.groups?.start) || 0)
        wordDuration = parseInt(timeMatchs.groups.duration) || 0
      }
    }

    if (wordTime === null) continue

    const wordContent = wordInfo.groups?.content
    if (!wordContent) continue

    const wordContentTrim = wordContent.trim()
    if (wordLast && !wordContentTrim) {
      wordLast.config.space.end = true
      continue
    }

    const wordResult = cloneDeep(EMPTY_DYNAMIC_ITEM)
    wordResult.time = {
      start: wordTime,
      end: wordTime + wordDuration,
      duration: wordDuration,
    }
    wordResult.content = {
      original: options.insert.space.enable ? insertSpace(wordContentTrim, options.insert.space.types) : wordContentTrim,
    }

    if (wordDuration > options.prolongedSound.checkTime) {
      wordResult.config.isProlongedSound = true
    }

    if (wordLast?.config.space.end === true) {
      wordResult.config.space.start = true
    }
    if (SPACE_START.test(wordContent) || checkFirstCharIsPunctuation(wordContentTrim)) {
      if (wordLast) wordLast.config.space.end = true
      wordResult.config.space.start = true
    }

    if (SPACE_END.test(wordContent) || checkEndCharIsPunctuation(wordContentTrim)) {
      wordResult.config.space.end = true
    }

    targetWords.push(wordResult)
  }

  const start = targetWords[0]?.time.start ?? lineTime
  const duration = targetWords.map((v) => v.time.duration).reduce((a, b) => a + b, 0)

  const time: TimeInfo = {
    start,
    end: start + duration,
    duration,
  }

  const target: Line.Info = cloneDeep(EMPTY_LINE_ITEM)
  target.time = time
  target.content.original = targetWords.map((item) => `${item.content.original}${item.config.space.end ? ' ' : ''}`).join('')
  target.content.dynamic = {
    time,
    items: targetWords,
  }

  return target
}

export const processDynamic = (context: Context, matched: MatchItem[]) => {
  if (matched.length <= 0) return null

  const options = context.common.options.get('content.normal.dynamic')
  const result: Line.Info[] = []
  for (const line of matched) {
    const item = processLine(options, line)
    if (!item) continue
    result.push(item)
  }

  return result
}
