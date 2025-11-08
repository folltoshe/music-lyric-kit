import { Lyric } from '@music-lyric-kit/shared'

import { cloneDeep } from '@music-lyric-kit/shared'

export const checkIsValid = (lines: Lyric.Line.Info[]) => {
  return lines.length > 0
}

export const processTextToWords = (text: string): Lyric.Line.Word[] => {
  const normalized = text.replace(/\s+/g, ' ').trim()
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
