import type { DeepRequired } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/parser/types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'
import { parseTagTime } from '@root/parser/utils'

const TIME_AND_CONTENT = /(<[^>]+>)([^<]*)/gu
const TIME_TAG_2 = /<([0-9]+),([0-9]+)\>/

const SPACE_START = /^\s+/
const SPACE_END = /\s+$/

const processLine = (options: DeepRequired<Parser.Config.Line>, line: MatchItem) => {
  const targetWords: Lyric.Line.Dynamic.Item[] = []

  const lineTime = parseTagTime(line.tag)
  if (lineTime === null) return

  for (const wordInfo of line.content.matchAll(TIME_AND_CONTENT)) {
    const wordLast = targetWords[targetWords.length - 1]
    const wordTimeTag = wordInfo[1] || ''

    let wordTime = parseTagTime(wordTimeTag)
    let wordDuration = 0

    if (wordTime !== null) {
      wordDuration = wordLast?.time.start - wordTime
    } else {
      const timeMatchs = wordTimeTag.match(TIME_TAG_2)
      if (timeMatchs) {
        wordTime = lineTime + (parseInt(timeMatchs[1]) || 0)
        wordDuration = parseInt(timeMatchs[2]) || 0
      }
    }

    if (wordTime === null) continue

    const wordContent = wordInfo[2] || ''
    if (!wordContent) continue

    const wordResult = cloneDeep(Lyric.EMPTY_DYNAMIC_ITEM)
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

    targetWords.push(wordResult)
  }

  const start = targetWords[0]?.time.start ?? lineTime
  const duration = targetWords.map((v) => v.time.duration).reduce((a, b) => a + b, 0)

  const time: Lyric.Time = {
    start,
    end: start + duration,
    duration,
  }

  const target: Lyric.Line.Info = cloneDeep(Lyric.EMPTY_LINE_INFO)
  const original = targetWords.map((item) => `${item.content.original}${item.config.space.end ? ' ' : ''}`).join('')
  target.time = time
  target.content.original = original
  target.content.dynamic = {
    time,
    items: targetWords,
  }

  return target
}

export const processDynamic = (context: Context, matched: MatchItem[]) => {
  if (matched.length <= 0) return null

  const options = context.common.config.get('line.dynamic', 'line.common')!
  const result: Lyric.Line.Info[] = []
  for (const line of matched) {
    const item = processLine(options, line)
    if (!item) continue
    result.push(item)
  }

  return result
}
