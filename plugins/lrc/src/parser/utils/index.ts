import { Lyric } from '@music-lyric-kit/shared'

import { cloneDeep, parseTime, replaceTextAllSpaceToOne } from '@music-lyric-kit/shared'

const LYRIC_TAG_CONTENT_REGEXP = /^[<\[]([^>\]]+)[>\]]$/

/**
 * parse lyric tag time
 *
 * @param tag lyric time tag, e.g. [1:14:514] or <1:14:514>
 */
export const parseTagTime = (tag: string): number | null => {
  const content = tag.trim().match(LYRIC_TAG_CONTENT_REGEXP)
  if (!content) return null

  const time = content[1]?.trim()
  if (!time) return null

  return parseTime(time)
}

const LYRIC_TAG_REGEXP = /(\[[^\]]*\])([\s\S]*?)(?=(?:\[[^\]]*\])|$)/g

export interface ParsedLyricLine {
  raw: string
  tag: string
  content: string
}

/**
 * parse lyric line meta and content
 *
 * support formats:
 *  - e.g. [1:14:514]line content
 *  - e.g. [offset:0][1:14:514]line content
 *
 * @param text raw lyric line
 * @param replaceTag need replace tag
 */
export const parseLyricLine = (text: string): ParsedLyricLine[] => {
  const result: ParsedLyricLine[] = []

  for (const match of text.matchAll(LYRIC_TAG_REGEXP)) {
    const raw = match[0]
    const tag = (match[1] || '').trim()
    const content = (match[2] || '').trim()
    result.push({ raw, tag, content })
  }

  return result
}

export const sortLines = (lines: Lyric.Line.Info[]) => {
  return lines.sort((a, b) => a.time.start - b.time.start)
}

export const checkLineIsValid = (lines: Lyric.Line.Info[]) => {
  return lines.length > 0
}

export const processTextToWords = (text: string): Lyric.Line.Word[] => {
  const normalized = replaceTextAllSpaceToOne(text).trim()
  const words = normalized.split(/(\s+)/g)

  const result: Lyric.Line.Word[] = []

  for (let i = 0; i < words.length; i++) {
    const current = words[i]
    const last = words[i - 1]
    const next = words[i + 1]

    if (!current?.trim()) {
      continue
    }

    const lastItem = result[i - 1]
    const targetItem: Lyric.Line.Word = cloneDeep(Lyric.EMPTY_WORD_ITEM)
    targetItem.content.original = current

    if (last?.trim() === '') {
      if (lastItem) {
        lastItem.config.needSpaceEnd = true
      }
      targetItem.config.needSpaceStart = true
    }

    if (next?.trim() === '') {
      targetItem.config.needSpaceEnd = true
    }

    if (lastItem && lastItem.config.needSpaceEnd) {
      targetItem.config.needSpaceStart = true
    }

    result.push(targetItem)
  }

  return result
}

export * from './align'
