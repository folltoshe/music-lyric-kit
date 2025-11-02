import { XMLParser } from 'fast-xml-parser'

import { checkIsValidText } from '@music-lyric-kit/shared'
import { readAttribute, readAttributeValue } from '@root/parser/utils'

const parser = new XMLParser({
  preserveOrder: true,
  trimValues: false,
  ignoreAttributes: false,
})

export const matchLyric = (content?: string) => {
  if (!content || !checkIsValidText(content)) {
    return null
  }

  const parsed = parser.parse(content)
  if (!parsed) {
    return null
  }

  const data = parsed[0]
  if (!data) {
    return null
  }

  const result = data.tt
  if (!result) {
    return null
  }

  const head = result[0]?.head
  const body = result[1]?.body

  const attr = readAttribute(data)
  const isAmll = !!readAttributeValue(attr, 'xmlns:amll')

  return { head, body, isAmll }
}
