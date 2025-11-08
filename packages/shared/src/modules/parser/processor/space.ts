import { Lyric } from '@root/core'
import type { Info, Line } from '@root/core/lyric'
import type { CommonContext } from '@root/modules/parser/plugin'

import { insertSpace, insertSpaceToWords, removeTextAllSpace } from '@root/utils'

const applySpaceToWords = (items: Line.Word[], result: string[]) => {
  const map = new Map<string, Line.Word[]>()
  for (const item of items) {
    const key = removeTextAllSpace(item.content.original)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }

  for (let i = 0; i < result.length; i++) {
    const current = result[i]

    const currentTrimmed = current.trim()
    if (!currentTrimmed) {
      continue
    }

    const key = removeTextAllSpace(current)
    const list = map.get(key)
    if (!list || list.length === 0) {
      continue
    }

    const item = list.shift()
    if (!item) {
      continue
    }

    item.content.original = current.trim()

    const prev = result[i - 1]
    const next = result[i + 1]
    if (prev?.trim() === '') item.config.needSpaceStart = true
    if (next?.trim() === '') item.config.needSpaceEnd = true
  }
}

export const insertSpaceToLines = (context: CommonContext, info: Info) => {
  const config = {
    main: context.common.config.get('line.main.insert.space', 'line.common.insert.space')!,
    translate: context.common.config.get('line.extended.translate.insert.space', 'line.common.insert.space')!,
    roman: context.common.config.get('line.extended.roman.insert.space', 'line.common.insert.space')!,
  }

  const handleProcess = (line: Lyric.Line.Info) => {
    if (config.main.enable) {
      const words = line.content.words.map((item) => item.content.original)
      const result = insertSpaceToWords(words, config.main.types)
      applySpaceToWords(line.content.words, result)
      line.content.original = line.content.words.map((item) => `${item.content.original}${item.config.needSpaceEnd ? ' ' : ''}`).join('')
    }

    for (const item of line.content.extended || []) {
      const [enable, types] =
        item.type === 'TRANSLATE'
          ? [config.translate.enable, config.translate.types]
          : item.type === 'ROMAN'
          ? [config.roman.enable, config.roman.types]
          : [null, null]

      if (!enable) {
        continue
      }

      item.content = insertSpace(item.content, types)
    }
  }

  for (const line of info.lines) {
    for (const item of line.background) {
      // @ts-expect-error
      handleProcess(item)
    }
    handleProcess(line)
  }

  return info
}
