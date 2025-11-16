import { Lyric } from '@root/core'
import type { Info, Line } from '@root/core/target'
import type { CommonContext } from '@root/core/parser/plugin'

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
    main: context.config.get('line.main.insert.space'),
    extended: context.config.get('line.extended.insert.space'),
  }

  const handleProcess = (line: Lyric.Line.Info) => {
    if (config.main.enable) {
      const words = line.content.words.map((item) => item.content.original)
      const result = insertSpaceToWords(words, config.main.types)
      applySpaceToWords(line.content.words, result)
      line.content.original = line.content.words.map((item) => `${item.content.original}${item.config.needSpaceEnd ? ' ' : ''}`).join('')
    }

    if (config.extended.enable) {
      for (const item of line.content.extended || []) {
        item.content = insertSpace(item.content, config.extended.types)
      }
    }
  }

  for (const line of info.lines) {
    for (const item of line.background || []) {
      handleProcess(item)
    }
    handleProcess(line)
  }

  return info
}
