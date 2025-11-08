import type { Context } from '@parser/core/types'

import { Lyric } from '@music-lyric-kit/shared'

import { readAttribute, readAttributeValue } from '@parser/utils'

const processItem = (target: Lyric.Meta, key: string, value: string) => {
  switch (key) {
    case 'musicName':
      if (!target.title) {
        target.title = []
      }
      target.title.push({
        raw: value,
        parsed: value,
      })
      break
    case 'artists':
      if (!target.artist) {
        target.artist = []
      }
      target.artist.push({
        raw: value,
        parsed: [value],
      })
      break
    case 'album':
      if (!target.album) {
        target.album = []
      }
      target.album.push({
        raw: value,
        parsed: value,
      })
      break
    case 'ttmlAuthorGithubLogin':
      if (!target.author) {
        target.author = []
      }
      target.author.push({
        raw: value,
        parsed: [value],
      })
      break
  }
}

export const processMeta = (context: Context, info: Lyric.Info, head: any) => {
  const metas: any[] = head[0]?.metadata
  if (!metas || !Array.isArray(metas)) return info

  const result: Lyric.Meta = { offset: { raw: '', parsed: 0 } }

  for (let index = 0; index < metas.length; index++) {
    const content = metas[index]
    if (!content) {
      continue
    }

    if ('amll:meta' in content) {
      const attr = readAttribute(content)
      const key = readAttributeValue(attr, 'key')
      const value = readAttributeValue(attr, 'value')
      processItem(result, key, value)
      continue
    }
  }

  info.meta = result
  return info
}
