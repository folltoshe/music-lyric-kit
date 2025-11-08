import type { DeepRequired } from '@music-lyric-kit/shared'
import type { Context } from '@root/parser/types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { parseTime, cloneDeep, checkIsValidText } from '@music-lyric-kit/shared'
import { readAttribute, readAttributeValue, readSpan, readSpanText, readTextValue } from '@root/parser/utils'

const processDynamicItem = (options: DeepRequired<Parser.Config.Line>, item: any) => {
  const span = readSpan(item)
  if (!span.length) {
    return
  }

  const attr = readAttribute(item)

  const start = parseTime(readAttributeValue(attr, 'begin'))
  const end = parseTime(readAttributeValue(attr, 'end'))
  if (!start || !end) {
    return null
  }

  const word = cloneDeep(Lyric.EMPTY_WORD_ITEM)

  const content = readSpanText(span)
  if (!checkIsValidText(content)) {
    return null
  }

  const contentTrim = content.trim()
  if (!contentTrim) {
    return null
  }

  word.time = {
    start,
    end,
    duration: end - start,
  }
  word.content = {
    original: contentTrim,
  }

  return word
}

const processRoleItem = (options: { translate: Parser.Config.Line; roman: Parser.Config.Line }, result: Lyric.Line.Info, item: any, role: string) => {
  const span = readSpan(item)
  if (!span.length) {
    return
  }

  const content = readSpanText(span)
  if (!checkIsValidText(content)) {
    return
  }

  const [type, config]: [Lyric.Line.Extended.Type, DeepRequired<Parser.Config.Line> | null] =
    role === 'x-translation' ? ['TRANSLATE', options.translate] : role === 'x-roman' ? ['ROMAN', options.roman] : ['UNKNOWN', null]

  if (!config) {
    return
  }

  if (!result.content.extended) {
    result.content.extended = []
  }

  const text = content.trim()
  const info: Lyric.Line.Extended.Info = {
    type,
    content: text,
  }
  result.content.extended.push(info)
}

const processLine = (context: Context, index: number, line: any) => {
  const attr = readAttribute(line)

  const start = parseTime(readAttributeValue(attr, 'begin'))
  const end = parseTime(readAttributeValue(attr, 'end'))
  if (!start || !end) return null

  const key: string = readAttributeValue(attr, 'itunes:key') || `L${index}`
  const agent: string = readAttributeValue(attr, 'ttm:agent') || ''

  const result = cloneDeep(Lyric.EMPTY_LINE_INFO)
  const words: Lyric.Line.Word[] = []

  const config = {
    main: context.common.config.get('line.main', 'line.common')!,
    translate: context.common.config.get('line.extended.translate', 'line.common')!,
    roman: context.common.config.get('line.extended.roman', 'line.common')!,
  }
  for (const item of line.p || []) {
    const attr = readAttribute(item)
    const role = readAttributeValue(attr, 'ttm:role')

    if (role) {
      processRoleItem(config, result, item, role)
      continue
    }

    const word = processDynamicItem(config.main, item)
    if (word) {
      words.push(word)
      continue
    }

    const content: string = readTextValue(item)
    const contentTrim = content.trim()
    if (!contentTrim) {
      const lastWord = words[words.length - 1]
      if (lastWord) {
        lastWord.content.original += ' '
      }
      continue
    }
  }

  const original = words.map((item) => `${item.content.original}${item.config.needSpaceEnd ? ' ' : ''}`).join('')
  const time: Lyric.Time = {
    start,
    end,
    duration: end - start,
  }

  result.id = key
  result.group.id = agent
  result.time = time
  result.content = {
    words,
    original,
  }

  return result
}

export const processLyric = (context: Context, body: any): Lyric.Info | null => {
  const lines: any[] = body[0]?.div
  if (!lines || !Array.isArray(lines)) return null

  const result = cloneDeep(Lyric.EMPTY_INFO)
  result.config.isDynamic = true

  for (let index = 0; index < lines.length; index++) {
    const content = lines[index]
    const target = processLine(context, index, content)
    if (!target) {
      continue
    }
    result.lines.push(target)
  }

  return result
}
