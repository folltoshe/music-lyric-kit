import type { Context } from '@root/parser/types'

import { Lyric, Parser } from '@music-lyric-kit/shared'

import { readAttribute, readAttributeValue } from '@root/parser/utils'

export const processGroup = (context: Context, info: Lyric.Info, head: any) => {
  const metas: any[] = head[0]?.metadata
  if (!metas || !Array.isArray(metas)) return info

  const result: Lyric.GroupList = []
  for (let index = 0; index < metas.length; index++) {
    const content = metas[index]
    if (!content) {
      continue
    }

    if ('ttm:agent' in content) {
      const attr = readAttribute(content)
      const type = readAttributeValue(attr, 'type')
      const id = readAttributeValue(attr, 'xml:id')

      const item: Lyric.GroupItem = {
        id,
        name: type,
        total: 0,
      }
      result.push(item)

      continue
    }
  }
  info.groups = result

  info = Parser.Processor.insertGroupCount(context, info)

  return info
}
