import type { Lyric } from '@music-lyric-kit/shared'
import type { Context } from '@builder/core/types'

import { exportTime } from '@music-lyric-kit/shared'

const renderItem = (key: string, content: string) => {
  return `[${key}:${content}]`
}

export const exportMeta = (context: Context, info: Lyric.Info) => {
  const result: string[] = []

  if (info.meta.offset) {
    const target = renderItem('offset', info.meta.offset.parsed.toString())
    result.push(target)
  }

  if (info.meta.duration) {
    const target = renderItem('length', exportTime(info.meta.duration.parsed, 'mm:ss'))
    result.push(target)
  }

  for (const item of info.meta.title || []) {
    const target = renderItem('ti', item.parsed)
    result.push(target)
  }

  for (const item of info.meta.album || []) {
    const target = renderItem('al', item.parsed)
    result.push(target)
  }

  for (const item of info.meta.artist || []) {
    const target = renderItem('ar', item.parsed.join(' / '))
    result.push(target)
  }

  for (const item of info.meta.artist || []) {
    const target = renderItem('ar', item.parsed.join(' / '))
    result.push(target)
  }

  for (const item of info.meta.author || []) {
    const target = renderItem('au', item.parsed.join(' / '))
    result.push(target)
  }

  return result
}
