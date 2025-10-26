import type { MetaInfo } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@root/parser/types'

import { parseTime } from '@root/parser/utils'

const splitNameWithRule = (name: string, rule: string | RegExp) => {
  return name
    .split(rule)
    .map((item) => item.trim())
    .filter((item) => !!item)
}

const processItem = (target: MetaInfo, key: string, value: string, rule: string | RegExp) => {
  switch (key) {
    case 'offset':
      target.offset = {
        raw: value,
        parsed: Number(value) || 0,
      }
      break
    case 'ti':
    case 'title':
      target.title = {
        raw: value,
        parsed: value,
      }
      break
    case 'ar':
    case 'artist':
      target.artist = {
        raw: value,
        parsed: splitNameWithRule(value, rule),
      }
      break
    case 'al':
    case 'album':
      target.album = {
        raw: value,
        parsed: value,
      }
      break
    case 'au':
    case 'author':
      target.author = {
        raw: value,
        parsed: splitNameWithRule(value, rule),
      }
      break
    case 'length':
    case 'duration':
      target.duration = {
        raw: value,
        parsed: parseTime(value) || 0,
      }
      break
  }
}

const LYRIC_META_REGEXP = /^\s*\[\s*(?<key>[A-Za-z0-9_-]+)\s*:\s*(?<value>[^\]]*)\s*\]\s*$/

export const processTag = (context: Context, metas: MatchItem[]) => {
  const result: MetaInfo = { offset: { raw: '', parsed: 0 } }

  const options = context.common.options.get('meta.tag')
  if (!options.enable) {
    return result
  }

  for (const meta of metas) {
    if (!meta.tag) continue

    const matched = meta.tag.match(LYRIC_META_REGEXP)
    if (!matched || !matched.groups) continue

    const key = (matched.groups.key || '').trim().toLowerCase()
    const value = (matched.groups.value || '').trim()
    if (!key || !value) continue

    processItem(result, key, value, options.name.split.rule)
  }

  return result
}
