import type { Info, Line } from '@root/core/lyric'
import type { CommonContext } from '@root/modules/parser/plugin'

import { insertSpace, insertSpaceToWords } from '@root/utils'

const removeAllSpace = (content: string) => {
  return content.replaceAll(/\s*/g, '').trim()
}

const applySpaceToWords = (items: Line.Dynamic.Item[], result: string[]) => {
  const map = new Map<string, Line.Dynamic.Item[]>()
  for (const item of items) {
    const key = removeAllSpace(item.content.original)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }

  for (let i = 0; i < result.length; i++) {
    const current = result[i]

    const currentTrimmed = current.trim()
    if (!currentTrimmed) {
      continue
    }

    const key = removeAllSpace(current)
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
    if (prev?.trim() === '') item.config.space.start = true
    if (next?.trim() === '') item.config.space.end = true
  }
}

export const insertSpaceToLines = (context: CommonContext, info: Info) => {
  const config = {
    original: context.common.config.get('line.original.insert.space', 'line.common.insert.space')!,
    dynamic: context.common.config.get('line.dynamic.insert.space', 'line.common.insert.space')!,
    translate: context.common.config.get('line.extended.translate.insert.space', 'line.common.insert.space')!,
    roman: context.common.config.get('line.extended.roman.insert.space', 'line.common.insert.space')!,
  }

  for (const line of info.lines) {
    if (line.content.dynamic && config.dynamic.enable) {
      const words = line.content.dynamic.items.map((item) => item.content.original)
      const result = insertSpaceToWords(words, config.dynamic.types)
      applySpaceToWords(line.content.dynamic.items, result)
      line.content.original = line.content.dynamic.items.map((item) => `${item.content.original}${item.config.space.end ? ' ' : ''}`).join('')
    } else if (line.content.original && config.original.enable) {
      const result = insertSpace(line.content.original, config.original.types)
      line.content.original = result
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

  return info
}
