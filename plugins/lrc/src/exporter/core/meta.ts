import type { Lyric } from '@music-lyric-kit/shared'
import type { Context } from '@root/exporter/types'

import { exportTime } from '@music-lyric-kit/shared'

const renderItem = (key: string, content: string) => {
  return `[${key}:${content}]`
}

export const exportMeta = (context: Context, info: Lyric.Info) => {
  const result: string[] = []

  result.push(renderItem('offset', info.meta.offset.parsed.toString()))

  if (info.meta.title) {
    const item = renderItem('ti', info.meta.title.parsed)
    result.push(item)
  }

  if (info.meta.artist) {
    const item = renderItem('ar', info.meta.artist.parsed.join(' / '))
    result.push(item)
  }

  if (info.meta.album) {
    const item = renderItem('al', info.meta.album.parsed)
    result.push(item)
  }

  if (info.meta.author) {
    const item = renderItem('au', info.meta.author.parsed.join(' / '))
    result.push(item)
  }

  if (info.meta.duration) {
    const item = renderItem('length', exportTime(info.meta.duration.parsed, 'mm:ss'))
    result.push(item)
  }

  return result
}
