import { get } from '@music-lyric-kit/shared'

const ATTRIBUTE_KEY = ':@'

export const readAttribute = (content: any) => {
  return get(content, ATTRIBUTE_KEY, {})
}

const ATTRIBUTE_VALUE_PREFIX = '@_'

export const readAttributeValue = (content: any, key: string, prefix?: string) => {
  const target = `${prefix ?? ATTRIBUTE_VALUE_PREFIX}${key}`
  return get(content, target)
}

const TEXT_NODE_KEY = '#text'

export const readTextValue = (content: any) => {
  return get(content, TEXT_NODE_KEY, '')
}
