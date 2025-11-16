import type { Lyric } from '@music-lyric-kit/shared'
import type { Context, MatchItem } from '@parser/core//types'

import { parseTime } from '@music-lyric-kit/shared'
import { processProducer } from '@parser/processer'

const splitNameWithRule = (name: string, rule: string | RegExp) => {
  return name
    .split(rule)
    .map((item) => item.trim())
    .filter((item) => !!item)
}

const processItem = (target: Lyric.Meta, key: string, value: string, rule: string | RegExp) => {
  switch (key) {
    case 'offset':
      target.offset = {
        raw: value,
        parsed: Number(value) || 0,
      }
      break
    case 'length':
    case 'duration':
      target.duration = {
        raw: value,
        parsed: parseTime(value) || 0,
      }
      break
    case 'ti':
    case 'title':
      if (!target.title) {
        target.title = []
      }
      target.title.push({
        raw: value,
        parsed: value,
      })
      break
    case 'ar':
    case 'artist':
      if (!target.artist) {
        target.artist = []
      }
      target.artist.push({
        raw: value,
        parsed: splitNameWithRule(value, rule),
      })
      break
    case 'al':
    case 'album':
      if (!target.album) {
        target.album = []
      }
      target.album.push({
        raw: value,
        parsed: value,
      })
      break
    case 'au':
    case 'author':
      if (!target.author) {
        target.author = []
      }
      target.author.push({
        raw: value,
        parsed: splitNameWithRule(value, rule),
      })
      break
  }
}

const LYRIC_META_REGEXP = /^\s*\[\s*([A-Za-z0-9_-]+)\s*:\s*([^\]]*)\s*\]\s*$/

const processTag = (context: Context, metas: MatchItem[]) => {
  const result: Lyric.Meta = { offset: { raw: '', parsed: 0 } }

  const options = context.config.get('meta.tag')
  if (!options.enable) {
    return result
  }

  for (const meta of metas) {
    if (!meta.tag) continue

    const matched = meta.tag.match(LYRIC_META_REGEXP)
    if (!matched) continue

    const key = (matched[1] || '').trim().toLowerCase()
    const value = (matched[2] || '').trim()
    if (!key || !value) continue

    processItem(result, key, value, options.name.splitRule)
  }

  return result
}

export const processMeta = (context: Context, metas: MatchItem[], lyric: Lyric.Info) => {
  const [lines, producer] = processProducer(context, lyric.lines)

  const meta = processTag(context, metas)
  meta.producer = producer

  const result = lyric
  result.lines = lines
  result.meta = meta

  return result
}
